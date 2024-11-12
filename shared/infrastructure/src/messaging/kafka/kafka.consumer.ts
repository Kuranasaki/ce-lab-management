import { BaseEvent, EventForTopic, KafkaTopic, Result } from "@ce-lab-mgmt/domain"
import { Consumer, KafkaConfig, Logger } from "kafkajs"
import { KafkaConnection } from "./kafka.connection"

type EventHandler<E> = (event: E) => Promise<void>

export class KafkaConsumer {
  private consumer: Consumer | undefined
  private readonly eventHandlers = new Map<string, Map<string, EventHandler<any>>>()

  constructor(
    private readonly config: KafkaConfig,
    private readonly groupId: string,
    private readonly logger: Logger | Console
  ) {}

  async connect(): Promise<Result<void>> {
    try {
      const consumerResult = await KafkaConnection.getConsumer(this.config, this.groupId)
      if (consumerResult.isFailure) {
        return Result.fail(consumerResult.error)
      }

      this.consumer = consumerResult.value
      return Result.ok()
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  subscribeToEvent<T extends KafkaTopic, E extends EventForTopic<T>>(
    topic: T, 
    eventType: E['eventType'],
    handler: EventHandler<E>
  ): void {
    if (!this.consumer) {
      throw new Error('Consumer is not connected')
    }

    if (!this.eventHandlers.has(topic)) {
      this.eventHandlers.set(topic, new Map())
      this.consumer.subscribe({ topic })
    }

    const topicHandlers = this.eventHandlers.get(topic)!
    topicHandlers.set(eventType, handler)
  }

  async startConsuming(): Promise<Result<void>> {
    try {
      if (!this.consumer) {
        throw new Error('Consumer is not connected')
      }

      await this.consumer.run({
        eachMessage: async (payload) => {
          try {
            const { topic, message } = payload
            const eventStr = message.value?.toString()
            
            if (eventStr) {
              const event = JSON.parse(eventStr) as BaseEvent<any, string>
              const topicHandlers = this.eventHandlers.get(topic)
              
              if (topicHandlers) {
                const handler = topicHandlers.get(event.eventType)
                if (handler) {
                  await handler(event)
                  this.logger.info('Event processed successfully', { 
                    topic, 
                    eventType: event.eventType 
                  })
                }
              }
            }
          } catch (error) {
            this.logger.error('Error processing message', {
              topic: payload.topic,
              error: error as Error
            })
          }
        }
      })

      return Result.ok()
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  async disconnect(): Promise<void> {
    if (!this.consumer) {
      return
    }
    await this.consumer.disconnect()
  }
}
