import { KafkaTopic } from "./topics";

export type ReservationEventType = 
  | 'ReservationCreated'
  | 'ReservationApproved'
  | 'ReservationRejected'
  | 'ReservationCancelled';

export type ExperimentEventType = 
  | 'ExperimentCreated'
  | 'ProfessorAssigned'
  | 'ExperimentStarted'
  | 'ExperimentStatusUpdated'
  | 'TestFormUploaded'
  | 'ExperimentCompleted';

export type ResultEventType =
  | 'ResultSubmitted'
  | 'ResultApproved'
  | 'ResultRejected';

export type CertificateEventType =
  | 'CertificateGenerated'
  | 'CertificateIssued'
  | 'CertificateRevoked';

export type ProfessorEventType =
  | 'ProfessorAvailabilityUpdated'
  | 'ProfessorAssignmentAccepted'
  | 'ProfessorAssignmentRejected';

// Map topics to their corresponding event types
export type TopicEventTypeMap = {
  [KafkaTopic.Reservation]: ReservationEventType;
  [KafkaTopic.Experiment]: ExperimentEventType;
  [KafkaTopic.Result]: ResultEventType;
  [KafkaTopic.Certificate]: CertificateEventType;
  [KafkaTopic.Professor]: ProfessorEventType;
};

export type EventTypeForTopic<T extends KafkaTopic> = TopicEventTypeMap[T];

export interface BaseEvent<T extends KafkaTopic, E extends EventTypeForTopic<T>> {
  eventId: string;
  eventType: E;
  aggregateId: string;
  timestamp: string;
}