import {
  OrganizationInfo,
  ReservationStatus,
  TestList
} from '@ce-lab-mgmt/api-interfaces';
import { IdGenerator } from '@ce-lab-mgmt/core-utils';
import { Result } from '@ce-lab-mgmt/domain';
import { persistance } from '@ce-lab-mgmt/infrastructure';
import { Prisma } from '@prisma/client';
import { Reservation } from '../../domain/aggregates/reservation.aggregate';
const PrismaRepository = persistance.PrismaRepository;

interface FindAllParams {
  page?: number;
  limit?: number;
  status?: ReservationStatus;
  fromDate?: Date;
  toDate?: Date;
  customerId?: string;
  orgName?: string;
  testType?: string;
  professorId?: string;
}

interface ReservationWithRelations {
  id: string;
  customerId: string;
  notes?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orgData: {
    id: string;
    orgName: string;
    orgProjectName?: string | null;
    orgAddress: string;
    orgEmail: string;
    orgPhone: string;
    orgFax?: string | null;
  };
  testList: Array<{
    id: string;
    testType: string;
    testID: string;
    testItemID: string;
    testName: string;
    testAmount: number;
    testPricePerUnit: number;
    testUnit: string;
    testDetails?: string | null;
    testNote?: string | null;
    assignedProfessorId?: string | null;
    assignedProfessorName?: string | null;
    markedAsDone?: boolean | null;
    certificateUploadedAt?: Date | null;
  }>;
}

export class ReservationRepository extends PrismaRepository<
  Reservation,
  ReservationWithRelations
> {
  // Base query for including related data
  private readonly baseInclude = {
    orgData: true,
    testList: true,
  } satisfies Prisma.ReservationInclude;

  protected async findModel(
    id: string
  ): Promise<ReservationWithRelations | null> {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: this.baseInclude,
    });
  }

  protected async saveModel(
    id: string,
    data: Omit<ReservationWithRelations, 'id'>
  ): Promise<ReservationWithRelations> {
    // We need to handle the nested relations in a transaction
    return this.prisma.$transaction(async (tx) => {
      // First, find or create the organization
      const organization = await tx.organization.upsert({
        where: {
          id: data.orgData.id || IdGenerator.generate(),
        },
        create: {
          id: IdGenerator.generate(),
          orgName: data.orgData.orgName,
          orgProjectName: data.orgData.orgProjectName,
          orgAddress: data.orgData.orgAddress,
          orgEmail: data.orgData.orgEmail,
          orgPhone: data.orgData.orgPhone,
          orgFax: data.orgData.orgFax,
        },
        update: {
          orgName: data.orgData.orgName,
          orgProjectName: data.orgData.orgProjectName,
          orgAddress: data.orgData.orgAddress,
          orgEmail: data.orgData.orgEmail,
          orgPhone: data.orgData.orgPhone,
          orgFax: data.orgData.orgFax,
        },
      });

      // Then create or update the reservation
      const reservation = await tx.reservation.upsert({
        where: { id },
        create: {
          id,
          customerId: data.customerId,
          status: data.status,
          notes: data.notes,
          orgDataId: organization.id,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        update: {
          customerId: data.customerId,
          status: data.status,
          notes: data.notes,
          orgDataId: organization.id,
          updatedAt: data.updatedAt,
        },
        include: this.baseInclude,
      });

      // Handle test entries
      // First, delete any existing test entries
      await tx.testEntry.deleteMany({
        where: { reservationId: reservation.id },
      });

      // Then create new test entries
      const testEntries = await Promise.all(
        data.testList.map((test) =>
          tx.testEntry.create({
            data: {
              //
              ...test,
              reservationId: reservation.id,
              id: IdGenerator.generate(),
            },
          })
        )
      );

      return {
        ...reservation,
        orgData: organization,
        testList: testEntries,
      };
    });
  }

  protected async deleteModel(id: string): Promise<boolean> {
    try {
      await this.prisma.reservation.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async findAll(params: FindAllParams): Promise<
    Result<{
      items: Reservation[];
      total: number;
    }>
  > {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        fromDate,
        toDate,
        customerId,
        orgName,
        testType,
        professorId,
      } = params;

      const whereClause: Prisma.ReservationWhereInput = {};
      const conditions: Prisma.ReservationWhereInput[] = [];

      // Add conditions based on parameters
      if (status) {
        conditions.push({ status });
      }

      if (customerId) {
        conditions.push({ customerId });
      }

      if (fromDate || toDate) {
        conditions.push({
          createdAt: {
            ...(fromDate && { gte: fromDate }),
            ...(toDate && { lte: toDate }),
          },
        });
      }

      if (orgName) {
        conditions.push({
          orgData: {
            orgName: {
              contains: orgName,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        });
      }

      if (testType) {
        conditions.push({
          testList: {
            some: {
              testType,
            },
          },
        });
      }

      if (professorId) {
        conditions.push({
          testList: {
            some: {
              assignedProfessorId: professorId,
            },
          },
        });
      }

      // Only add AND condition if there are conditions to add
      if (conditions.length > 0) {
        whereClause.AND = conditions;
      }

      const [items, total] = await Promise.all([
        this.prisma.reservation.findMany({
          where: whereClause,
          include: this.baseInclude,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.reservation.count({
          where: whereClause,
        }),
      ]);

      return Result.ok({
        items: items.map((item) => this.toDomain(item)),
        total,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  // Additional helper method for building complex queries
  private buildPaginationParams(page: number = 1, limit: number = 10) {
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  // Helper method for building date range conditions
  private buildDateRangeCondition(
    fromDate?: Date,
    toDate?: Date
  ): Prisma.ReservationWhereInput | undefined {
    if (!fromDate && !toDate) return undefined;

    return {
      createdAt: {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      },
    };
  }

  // Helper method for building organization name condition
  private buildOrgNameCondition(
    orgName?: string
  ): Prisma.ReservationWhereInput | undefined {
    if (!orgName) return undefined;

    return {
      orgData: {
        orgName: {
          contains: orgName,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    };
  }

  async findByCustomerWithFilters(
    customerId: string,
    filters: {
      status?: ReservationStatus;
      fromDate?: Date;
      toDate?: Date;
      testType?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<Result<{ items: Reservation[]; total: number }>> {
    try {
      const { page = 1, limit = 10 } = filters;
      const conditions: Prisma.ReservationWhereInput[] = [{ customerId }];

      if (filters.status) {
        conditions.push({ status: filters.status });
      }

      const dateCondition = this.buildDateRangeCondition(
        filters.fromDate,
        filters.toDate
      );
      if (dateCondition) {
        conditions.push(dateCondition);
      }

      if (filters.testType) {
        conditions.push({
          testList: {
            some: { testType: filters.testType },
          },
        });
      }

      const whereClause: Prisma.ReservationWhereInput = {
        AND: conditions,
      };

      const [items, total] = await Promise.all([
        this.prisma.reservation.findMany({
          where: whereClause,
          include: this.baseInclude,
          ...this.buildPaginationParams(page, limit),
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.reservation.count({
          where: whereClause,
        }),
      ]);

      return Result.ok({
        items: items.map((item) => this.toDomain(item)),
        total,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async findByProfessorWithFilters(
    professorId: string,
    filters: {
      status?: ReservationStatus;
      markedAsDone?: boolean;
      fromDate?: Date;
      toDate?: Date;
      page?: number;
      limit?: number;
    }
  ): Promise<Result<{ items: Reservation[]; total: number }>> {
    try {
      const { page = 1, limit = 10 } = filters;
      const conditions: Prisma.ReservationWhereInput[] = [
        {
          testList: {
            some: {
              assignedProfessorId: professorId,
              ...(filters.markedAsDone !== undefined && {
                markedAsDone: filters.markedAsDone,
              }),
            },
          },
        },
      ];

      if (filters.status) {
        conditions.push({ status: filters.status });
      }

      const dateCondition = this.buildDateRangeCondition(
        filters.fromDate,
        filters.toDate
      );
      if (dateCondition) {
        conditions.push(dateCondition);
      }

      const whereClause: Prisma.ReservationWhereInput = {
        AND: conditions,
      };

      const [items, total] = await Promise.all([
        this.prisma.reservation.findMany({
          where: whereClause,
          include: this.baseInclude,
          ...this.buildPaginationParams(page, limit),
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.reservation.count({
          where: whereClause,
        }),
      ]);

      return Result.ok({
        items: items.map((item) => this.toDomain(item)),
        total,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async findByOrganization(
    orgName: string,
    params: {
      page?: number;
      limit?: number;
      status?: ReservationStatus;
    }
  ): Promise<Result<{ items: Reservation[]; total: number }>> {
    return this.findAll({
      ...params,
      orgName,
    });
  }

  async findByTestType(
    testType: string,
    params: {
      page?: number;
      limit?: number;
      status?: ReservationStatus;
    }
  ): Promise<Result<{ items: Reservation[]; total: number }>> {
    return this.findAll({
      ...params,
      testType,
    });
  }

  async findByProfessor(
    professorId: string,
    params: {
      page?: number;
      limit?: number;
      status?: ReservationStatus;
      markedAsDone?: boolean;
    }
  ): Promise<Result<{ items: Reservation[]; total: number }>> {
    // Specific implementation for professor queries
    try {
      const { page = 1, limit = 10, status, markedAsDone } = params;

      const whereClause: Prisma.ReservationWhereInput = {
        testList: {
          some: {
            assignedProfessorId: professorId,
            ...(markedAsDone !== undefined && { markedAsDone }),
          },
        },
        ...(status && { status }),
      };

      const [items, total] = await Promise.all([
        this.prisma.reservation.findMany({
          where: whereClause,
          include: this.baseInclude,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.reservation.count({
          where: whereClause,
        }),
      ]);

      return Result.ok({
        items: items.map((item) => this.toDomain(item)),
        total,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async assignProfessor(
    testEntryId: string,
    professorId: string,
    professorName: string
  ): Promise<Result<void>> {
    try {
      await this.prisma.testEntry.update({
        where: { id: testEntryId },
        data: {
          assignedProfessorId: professorId,
          assignedProfessorName: professorName,
        },
      });
      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async markTestAsDone(
    testEntryId: string,
    isDone: boolean
  ): Promise<Result<void>> {
    try {
      await this.prisma.testEntry.update({
        where: { id: testEntryId },
        data: {
          markedAsDone: isDone,
          ...(isDone && { certificateUploadedAt: new Date() }),
        },
      });
      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  protected toDomain(model: ReservationWithRelations): Reservation {
    const orgInfo: OrganizationInfo = {
      orgName: model.orgData.orgName,
      orgProjectName: model.orgData.orgProjectName ?? undefined,
      orgAddress: model.orgData.orgAddress,
      orgEmail: model.orgData.orgEmail,
      orgPhone: model.orgData.orgPhone,
      orgFax: model.orgData.orgFax ?? undefined,
    };

    const testInfo: TestList = {
      testt: model.testList[0]?.testType ?? '', // You might want to adjust this based on your domain logic
      testItems: model.testList.map((test) => ({
        testID: test.testID,
        testItemID: test.testItemID,
        testName: test.testName,
        testAmount: test.testAmount,
        testPricePerUnit: test.testPricePerUnit,
        testUnit: test.testUnit,
        testDetails: test.testDetails ?? null,
        testNote: test.testNote ?? null,
        assignedProfessorName: test.assignedProfessorName ?? null,
        markedAsDone: test.markedAsDone ?? null,
        certificateUploadedAt: test.certificateUploadedAt ?? null,
      })),
    };

    return Reservation.reconstitute({
      id: model.id,
      customerId: model.customerId,
      orgData: orgInfo,
      testList: testInfo,
      totalPrice: 0, // You might want to calculate this based on your domain logic
      status: model.status as ReservationStatus,
      notes: model.notes ?? '',
      createdAt: model.createdAt.toISOString(),
      updatedAt: model.updatedAt.toISOString(),
    });
  }

  protected toPersistence(
    entity: Reservation
  ): Omit<ReservationWithRelations, 'id'> {
    const now = new Date();
    return {
      customerId: entity.customerId,
      notes: entity.notes ?? null,
      status: entity.status,
      createdAt: new Date(entity.createdAt),
      updatedAt: now,
      orgData: {
        id: IdGenerator.generate(), // Generate new ID for new organizations
        orgName: entity.orgData.orgName,
        orgProjectName: entity.orgData.orgProjectName ?? null,
        orgAddress: entity.orgData.orgAddress,
        orgEmail: entity.orgData.orgEmail,
        orgPhone: entity.orgData.orgPhone,
        orgFax: entity.orgData.orgFax ?? null,
      },
      testList: entity.testList.testItems.map((test) => ({
        id: IdGenerator.generate(), // Generate new ID for each test
        testType: entity.testList.testt,
        testID: test.testID,
        testItemID: test.testItemID,
        testName: test.testName,
        testAmount: test.testAmount,
        testPricePerUnit: test.testPricePerUnit,
        testUnit: test.testUnit,
        testDetails: test.testDetails,
        testNote: test.testNote,
        assignedProfessorName: test.assignedProfessorName,
        markedAsDone: test.markedAsDone,
        certificateUploadedAt: test.certificateUploadedAt,
      })),
    };
  }
}
