import { Kafka, Producer, Consumer, logLevel, KafkaConfig } from 'kafkajs'
import { Result } from '@ce-lab-mgmt/domain'
import { Guard } from '@ce-lab-mgmt/core-utils'

export class KafkaConnection {
  private static instance: Kafka
  private static producer: Producer
  private static consumers: Map<string, Consumer> = new Map()

  static getKafka(config: KafkaConfig): Result<Kafka> {
    try {

      if (!KafkaConnection.instance) {
        KafkaConnection.instance = new Kafka({
          clientId: config.clientId,
          brokers: config.brokers,
          ssl: config.ssl,
          // sasl: config.sasl,
          logLevel: logLevel.ERROR,
          retry: config.retry || {
            initialRetryTime: 100,
            retries: 8
          }
        })
      }

      return Result.ok(KafkaConnection.instance)
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  static async getProducer(config: KafkaConfig): Promise<Result<Producer>> {
    try {
      const kafkaResult = KafkaConnection.getKafka(config)
      if (kafkaResult.isFailure) {
        return Result.fail(kafkaResult.error)
      }

      if (!KafkaConnection.producer) {
        KafkaConnection.producer = KafkaConnection.instance.producer()
        await KafkaConnection.producer.connect()
      }

      return Result.ok(KafkaConnection.producer)
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  static async getConsumer(
    config: KafkaConfig,
    groupId: string
  ): Promise<Result<Consumer>> {
    try {
      const kafkaResult = KafkaConnection.getKafka(config)
      if (kafkaResult.isFailure) {
        return Result.fail(kafkaResult.error)
      }

      const consumerKey = `${config.clientId}-${groupId}`
      
      if (!KafkaConnection.consumers.has(consumerKey)) {
        const consumer = KafkaConnection.instance.consumer({ groupId })
        await consumer.connect()
        KafkaConnection.consumers.set(consumerKey, consumer)
      }

      return Result.ok(KafkaConnection.consumers.get(consumerKey)!)
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  static async disconnect(): Promise<void> {
    if (KafkaConnection.producer) {
      await KafkaConnection.producer.disconnect()
    }

    for (const consumer of KafkaConnection.consumers.values()) {
      await consumer.disconnect()
    }

    KafkaConnection.consumers.clear()
  }
}
