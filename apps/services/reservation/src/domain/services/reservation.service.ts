import { Result, UnauthorizedError } from '@ce-lab-mgmt/domain';
import { Reservation } from '../../domain/aggregates/reservation.aggregate';
import { ReservationRepository } from '../../domain/repository/reservation.repository';
import { KafkaProducer } from '@ce-lab-mgmt/infrastructure';
import { NotFoundError } from 'elysia';
import { PrismaUnitOfWork } from 'shared/infrastructure/src/persistence';
import { UpdateReservationDTO } from '../../app/http/reservation.schema';
import {
  RequestReservationForm,
  ReservationStatus,
} from '@ce-lab-mgmt/api-interfaces';

interface CreateReservationParams {
  customerId: string;
  testCategoryId: string;
  requestedDate: Date;
  notes?: string;
}

interface UpdateReservationParams {
  notes: string;
}

interface GetReservationsParams {
  customerId?: string; // Optional for admin queries
  page: number;
  limit: number;
  status?: ReservationStatus;
  fromDate?: Date;
  toDate?: Date;
}

export class ReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly kafkaProducer: KafkaProducer,
    private readonly unitOfWork: PrismaUnitOfWork
  ) {}

  // Query Methods

  async getReservations(params: GetReservationsParams): Promise<
    Result<{
      items: Reservation[];
      total: number;
      // page: number;
      // limit: number;
    }>
  > {
    try {
      const now = new Date();
      const result = await this.reservationRepo.findByCustomerWithFilters(
        params.customerId!,
        {
          page: params.page,
          limit: params.limit,
          status: params.status,
          // fromDate: params.fromDate ?? DateHelper.addDays(now, -30),
          // toDate: params.toDate
        }
      );

      if (result.isFailure) {
        return result;
      }

      return Result.ok({
        items: result.value.items,
        total: result.value.total,
        page: params.page,
        limit: params.limit,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async getAllReservations(
    params: Omit<GetReservationsParams, 'customerId'>
  ): Promise<
    Result<{
      items: Reservation[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    try {
      const result = await this.reservationRepo.findAll({
        page: params.page,
        limit: params.limit,
        status: params.status,
        fromDate: params.fromDate,
        toDate: params.toDate,
      });

      if (result.isFailure) {
        return result as Result<any>;
      }

      return Result.ok({
        items: result.value.items,
        total: result.value.total,
        page: params.page,
        limit: params.limit,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async getReservation(
    id: string,
    userId?: string
  ): Promise<Result<Reservation>> {
    try {
      const result = await this.reservationRepo.findById(id);
      if (result.isFailure) {
        return result as Result<Reservation, Error>;
      }

      const reservation = result.value;
      if (!reservation) {
        return Result.fail(new NotFoundError('Reservation ' + id));
      }

      // Check authorization
      if (userId && reservation.customerId !== userId) {
        return Result.fail(
          new UnauthorizedError('Not authorized to view this reservation')
        );
      }

      return Result.ok(reservation);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  // Command Methods

  async createReservation(
    ctx: { uid: string },
    params: RequestReservationForm
  ): Promise<Result<Reservation>> {
    return this.unitOfWork.$transaction(async () => {
      try {
        // Validate parameters

        // Check for overlapping reservations
        // const overlapResult = await this.reservationRepo.findOverlappingReservations(
        //   params.testCategoryId,
        //   params.requestedDate,
        //   new Date(params.requestedDate.getTime() + 30 * 60000) // 30 minutes slot
        // );

        // if (overlapResult.isFailure) {
        //   return Result.fail(new Error('Failed overlapping reservations'));
        // }

        // if (overlapResult.value.length > 0) {
        //   return Result.fail(new Error('Time slot already taken'));
        // }

        // Create reservation aggregate
        const reservationResult = await Reservation.create(
          ctx.uid,
          params.orgInfo,
          params.testInfo
          // params.notes
        );

        if (reservationResult.isFailure) {
          return reservationResult;
        }

        // Save to database
        const savedResult = await this.reservationRepo.save(
          reservationResult.value
        );
        if (savedResult.isFailure) {
          return savedResult;
        }

        // Publish domain events
        for (const event of savedResult.value.events) {
          await this.kafkaProducer.publishEvent('reservation-events', event);
        }

        return savedResult;
      } catch (error) {
        return Result.fail(error as Error);
      }
    });
  }

  async updateReservation(
    id: string,
    userId: string,
    data: UpdateReservationDTO
  ) {
    return this.unitOfWork.$transaction(async () => {
      const reservation = await this.getReservation(id, userId);

      reservation.value.updateNotes(data.notes);

      const saved = await this.reservationRepo.save(reservation.value);

      // Publish events
      for (const event of saved.value.events) {
        await this.kafkaProducer.publishEvent('reservation-events', event);
      }

      return saved;
    });
  }

  async approveReservation(id: string): Promise<Result<void>> {
    return this.unitOfWork.$transaction(async () => {
      try {
        // Get reservation
        const reservationResult = await this.reservationRepo.findById(id);
        if (reservationResult.isFailure) {
          return Result.fail(reservationResult.error);
        }

        const reservation = reservationResult.value;
        if (!reservation) {
          return Result.fail(new NotFoundError('Reservation ' + id));
        }

        // Approve reservation
        const approveResult = reservation.approve();
        if (approveResult.isFailure) {
          return approveResult;
        }

        // Save changes
        const savedResult = await this.reservationRepo.save(reservation);
        if (savedResult.isFailure) {
          return Result.fail(savedResult.error);
        }

        // Publish events
        for (const event of reservation.events) {
          await this.kafkaProducer.publishEvent('reservation-events', event);
        }

        return Result.ok();
      } catch (error) {
        return Result.fail(error as Error);
      }
    });
  }

  async rejectReservation(id: string) {
    return this.unitOfWork.$transaction(async () => {
      const reservation = await this.getReservation(id);

      reservation.value.reject();

      const saved = await this.reservationRepo.save(reservation.value);

      // Publish events
      for (const event of saved.value.events) {
        await this.kafkaProducer.publishEvent('reservation-events', event);
      }

      return saved;
    });
  }
}
