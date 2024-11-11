import { OrganizationInfo, ReservationSchema, ReservationStatus, TestList, Reservation as  TReservation } from '@ce-lab-mgmt/api-interfaces';
import { IdGenerator } from '@ce-lab-mgmt/core-utils';
import { aggregation, Result, DomainError } from '@ce-lab-mgmt/domain';
import { Static } from 'elysia';

const { AggregateRoot } = aggregation;

// const ReservationPropsSchema = Type.Object({
//   id: Type.String({ format: 'uuid' }),
//   customerId: Type.String({ format: 'uuid' }),
//   testCategoryId: Type.String({ format: 'uuid' }),
//   requestedDate: Type.String({ format: 'date-time' }),
//   notes: Type.Optional(Type.String()),
//   status: Type.Union([
//     Type.Literal('pending'),
//     Type.Literal('approved'),
//     Type.Literal('rejected'),
//     Type.Literal('cancelled')
//   ]),
//   createdAt: Type.String({ format: 'date-time' }),
//   updatedAt: Type.String({ format: 'date-time' })
// });

type ReservationProps = Static<typeof ReservationSchema>;

export class ReservationError extends DomainError {
  constructor(message: string) {
    super(message, 'RESERVATION_ERROR');
  }
}

export class Reservation extends AggregateRoot {
  private constructor(private readonly props: ReservationProps) {
    super(props.id);
    // Guard.validate(props, ReservationSchema);
  }

  // Factory method for creating new reservations
  public static create(
    customerId: string,
    orgInfo: OrganizationInfo,
    testInfo: TestList
  ): Result<Reservation> {
    try {
      const now = new Date();
      
      // // Validate requested date is in the future
      // if (testInfo.testList.some((t)=> t.) < now) {
      //   throw new ReservationError('Requested date must be in the future');
      // }

      const props: ReservationProps = {
        id: IdGenerator.generate(),
        customerId,
        orgData: orgInfo,
        testList: testInfo,
        totalPrice: 0,
        status: 'pending',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      };

      const reservation = new Reservation(props);
      
      // Add domain event
      reservation.addEvent({
        eventId: IdGenerator.generate(),
        eventType: 'ReservationCreated',
        aggregateId: reservation.id,
        timestamp: now.toISOString(),
        data: props
      });

      return Result.ok(reservation);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  // For reconstructing from persistence
  public static reconstitute(props: { 
    id: string;
    customerId: string;
    orgData: OrganizationInfo;
    testList: TestList
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    notes: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  }): Reservation {
    return new Reservation({
      id: props.id,
      customerId: props.customerId,
      orgData: props.orgData,
      testList: props.testList,
      status: props.status,
      totalPrice: props.totalPrice,
      notes: props.notes,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    });
  }

  // Domain methods
  public approve(): Result<void> {
    try {
      if (this.props.status !== 'pending') {
        throw new ReservationError('Can only approve pending reservations');
      }

      this.props.status = 'approved';
      this.props.updatedAt = new Date().toISOString();

      this.addEvent({
        eventId: IdGenerator.generate(),
        eventType: 'ReservationApproved',
        aggregateId: this.id,
        timestamp: new Date().toISOString(),
        data: this.props
      });

      return Result.ok();
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  public reject(): void {
    if (this.props.status !== 'pending') {
      throw new ReservationError('Can only reject pending reservations')
    }

    this.props.status = 'rejected'
    this.props.updatedAt = new Date().toISOString()
    this.incrementVersion()

    this.addEvent({
      eventId: IdGenerator.generate(),
      eventType: 'ReservationRejected',
      aggregateId: this.id,
      timestamp: new Date().toISOString(),
      data: {
        // id: this.id,
        ...this.props
      }
    })
  }

  public updateNotes(notes: string): void {
    if (this.props.status === 'cancelled' || this.props.status === 'rejected') {
      throw new ReservationError('Cannot update cancelled or rejected reservations')
    }

    this.props.notes = notes
    this.props.updatedAt = new Date().toISOString()
    this.incrementVersion()

    this.addEvent({
      eventId: IdGenerator.generate(),
      eventType: 'ReservationUpdated',
      aggregateId: this.id,
      timestamp: new Date().toISOString(),
      data: {
        // id: this.id,
        ...this.props
      }
    })
  }

  get self(): TReservation {
    return {
      id: this.id,
      customerId: this.customerId,
      orgData: this.orgData,
      testList: this.testList,
      totalPrice: this.totalPrice,
      notes: this.notes,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.props.updatedAt
    }
  }

  get totalPrice(): number {
    return this.props.totalPrice
  } 
  // Getters
  get customerId(): string {
    return this.props.customerId;
  }

  get notes(): string | undefined {
    return this.props.notes
  }

  get orgData(): OrganizationInfo {
    return this.props.orgData;
  }

  get status(): ReservationStatus {
    return this.props.status;
  }

  get testList(): TestList {
    return this.props.testList
  }

  get createdAt(): string {
    return this.props.createdAt;
  }
}
