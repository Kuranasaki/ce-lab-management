import { BaseEvent } from "../events";
import { KafkaTopic } from "../topics";


export interface ProfessorAssignedPayload {
  experimentId: string;
  professorId: string;
}

export interface ExperimentStatusUpdatedPayload {
  experimentId: string;
  status: string;
}



export interface ProfessorAssignedEvent extends BaseEvent<KafkaTopic.Experiment, 'ProfessorAssigned'> {
  data: ProfessorAssignedPayload;
}

export type ExperimentEvent = ProfessorAssignedEvent;