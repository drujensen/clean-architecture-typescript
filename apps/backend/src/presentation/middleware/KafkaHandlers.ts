// Example Kafka handler for async events
import { ProductCreatedEvent } from '../../domain';

export class ProductEventHandler {
  async handleProductCreated(event: ProductCreatedEvent): Promise<void> {
    console.log('Handling product created event:', event);
    // Implement async logic, e.g., send email, update cache, etc.
  }
}