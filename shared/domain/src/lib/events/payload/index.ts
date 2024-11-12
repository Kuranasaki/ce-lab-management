import { KafkaTopic } from '../topics';
import { ExperimentEvent } from './experiment';
import { ReservationEvent } from './reservation';
import { ResultEvent } from './result';

export * from './reservation';
export * from './result';
export * from './experiment';
export type DomainEvent = ReservationEvent 

 export type EventForTopic<T extends KafkaTopic> = 
      T extends KafkaTopic.Reservation ? ReservationEvent :
      T extends KafkaTopic.Experiment ? ExperimentEvent :
      T extends KafkaTopic.Result ? ResultEvent :
      never;