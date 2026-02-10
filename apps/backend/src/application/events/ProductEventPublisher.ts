import { ProductCreatedEvent, ProductUpdatedEvent } from '../../domain/events';

export class ProductEventPublisher {
  constructor(private readonly messageBus: any) {} // Will inject IMessageBus

  async publishProductCreated(event: ProductCreatedEvent): Promise<void> {
    await this.messageBus.publish('product.created', event);
  }

  async publishProductUpdated(event: ProductUpdatedEvent): Promise<void> {
    await this.messageBus.publish('product.updated', event);
  }
}

