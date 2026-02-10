import { IMessageBus } from '../../domain';
import { Kafka, Producer, Consumer } from 'kafkajs';

export class KafkaMessageBus implements IMessageBus {
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] });
    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: 'product-service' });
    this.producer.connect();
    this.consumer.connect();
  }

  async publish(topic: string, message: any): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  subscribe(topic: string, handler: (message: any) => Promise<void>): void {
    this.consumer.subscribe({ topic });
    this.consumer.run({
      eachMessage: async ({ message }) => {
        const parsed = JSON.parse(message.value!.toString());
        await handler(parsed);
      },
    });
  }
}