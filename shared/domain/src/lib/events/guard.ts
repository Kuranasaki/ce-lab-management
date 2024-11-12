// import { DomainEvent } from "../base-type";
// import { BaseEvent, EventTypeForTopic, TopicEventTypeMap } from "./events";
// import { KafkaTopic } from "./topics";

// export function isTopicEvent<T extends KafkaTopic>(
//   event: DomainEvent, 
//   topic: T
// ): event is Extract<DomainEvent, BaseEvent<T, EventTypeForTopic<T>>> {
//   return Object.values(TopicEventTypeMap[topic]).includes(event.eventType as any);
// }
