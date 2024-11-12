import { BaseEvent } from "../events";
import { KafkaTopic } from "../topics";

export interface ReservationApprovedPayload {
  reservationId: string;
  customerId: string;
  testItems: Array<{
    id: string;
    testName: string;
    amount: number;
    details?: string;
    note?: string;
  }>;
}

export interface ReservationRejectedPayload {
  reservationId: string;
  customerId: string;
  reason: string;
}

export interface ReservationApprovedEvent extends BaseEvent<KafkaTopic.Reservation, 'ReservationApproved'> {
  data: ReservationApprovedPayload;
}

export interface ReservationCreatedEvent extends BaseEvent<KafkaTopic.Reservation, 'ReservationCreated'> {
  data: ReservationApprovedPayload;
}

export interface ReservationRejectedEvent extends BaseEvent<KafkaTopic.Reservation, 'ReservationRejected'> {
  data: ReservationRejectedPayload;
}

export type ReservationEvent = ReservationApprovedEvent | ReservationRejectedEvent | ReservationCreatedEvent;
