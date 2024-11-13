import { DomainEvent, Result } from "@ce-lab-mgmt/domain"
import { EachMessagePayload, Consumer, KafkaConfig, Logger } from "kafkajs"
import { KafkaConnection } from "./kafka.connection"


export type MessageHandler = (payload: EachMessagePayload) => Promise<void>
export type EventHandler = (event: DomainEvent) => Promise<void>

export class KafkaConsumer {
  private consumer: Consumer | undefined
  private readonly handlers: Map<string, MessageHandler> = new Map()
  private readonly eventHandlers: Map<string, EventHandler> = new Map()

  constructor(
    private readonly config: KafkaConfig,
    private readonly groupId: string,
    private readonly logger: Logger
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

  subscribe(
    topic: string, 
    handler: MessageHandler,
    options?: { fromBeginning?: boolean }
  ): void {
    if (!this.consumer) {
      throw new Error('Consumer is not connected')
    }
    this.handlers.set(topic, handler)
    this.consumer.subscribe({ topic, fromBeginning: options?.fromBeginning })
  }

  subscribeToEvent(eventType: string, handler: EventHandler): void {
    this.eventHandlers.set(eventType, handler)
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
            const handler = this.handlers.get(topic)

            if (handler) {
              await handler(payload)
            } else {
              // Try to handle as domain event
              const eventStr = message.value?.toString()
              if (eventStr) {
                const event = JSON.parse(eventStr) as DomainEvent
                const eventHandler = this.eventHandlers.get(event.eventType)
                
                if (eventHandler) {
                  await eventHandler(event)
                }
              }
            }

            this.logger.info('Message processed successfully', { topic })
          } catch (error) {
            this.logger.error('Error processing message', {
              topic: payload.topic,
              error: error as Error
            })
            // Don't rethrow to prevent consumer from crashing
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