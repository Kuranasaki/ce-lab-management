import { BaseEvent } from "../events";
import { KafkaTopic } from "../topics";

export interface ResultSubmittedPayload {
  resultId: string;
  experimentId: string;
  testId: string;
}

export interface ResultApprovedPayload {
  resultId: string;
}

export interface ResultRejectedPayload {
  resultId: string;
  reason: string;
}

export interface ResultSubmittedEvent extends BaseEvent<KafkaTopic.Result, 'ResultSubmitted'> {
  data: ResultSubmittedPayload;
}

export interface ResultApprovedEvent extends BaseEvent<KafkaTopic.Result, 'ResultApproved'> {
  data: ResultApprovedPayload;
}

export interface ResultRejectedEvent extends BaseEvent<KafkaTopic.Result, 'ResultRejected'> {
  data: ResultRejectedPayload;
}

export type ResultEvent = ResultSubmittedEvent | ResultApprovedEvent | ResultRejectedEvent;
