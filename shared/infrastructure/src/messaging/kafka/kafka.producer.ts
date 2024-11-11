import { Result, DomainEvent } from "@ce-lab-mgmt/domain"
import { Producer, KafkaConfig, Logger, Message, ProducerRecord } from "kafkajs"
import { KafkaConnection } from "./kafka.connection"

export class KafkaProducer {
  private producer: Producer | undefined

  constructor(
    private readonly config: KafkaConfig,
    private readonly logger: Logger
  ) {}

  async connect(): Promise<Result<void>> {
    try {
      const producerResult = await KafkaConnection.getProducer(this.config)
      if (producerResult.isFailure) {
        return Result.fail(producerResult.error)
      }

      this.producer = producerResult.value
      return Result.ok()
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  async publishEvent(
    topic: string,
    event: DomainEvent,
    key?: string
  ): Promise<Result<void>> {
    try {

      if (!this.producer) {
        throw new Error('Producer is not connected')
      }
      const message: Message = {
        key: key || event.aggregateId,
        value: JSON.stringify(event),
        headers: {
          eventType: event.eventType,
          timestamp: event.timestamp
        }
      }

      const record: ProducerRecord = {
        topic,
        messages: [message]
      }

      await this.producer.send(record)
      this.logger.info('Event published successfully', { 
        topic, 
        eventType: event.eventType,
        aggregateId: event.aggregateId
      })
      
      return Result.ok()
    } catch (error) {
      this.logger.error('Failed to publish event', {
        topic,
        eventType: event.eventType,
        error: error as Error
      })
      return Result.fail(error as Error)
    }
  }

  async publishMessage(
    topic: string,
    message: Message
  ): Promise<Result<void>> {
    try {
      if (!this.producer) {
        throw new Error('Producer is not connected')
      }
      const record: ProducerRecord = {
        topic,
        messages: [message]
      }

      await this.producer.send(record)
      this.logger.info('Message published successfully', { topic })
      
      return Result.ok()
    } catch (error) {
      this.logger.error('Failed to publish message', {
        topic,
        error: error as Error
      })
      return Result.fail(error as Error)
    }
  }

  async disconnect(): Promise<void> {
    if (!this.producer) {
      return
    }
    await this.producer.disconnect()
  }
}