import 'reflect-metadata';
import { Container } from 'inversify';
import { IProductRepository } from './domain/repositories/IProductRepository';
import { ICacheService } from './domain/repositories/ICacheService';
import { IMessageBus } from './domain/repositories/IMessageBus';
import { MongoProductRepository } from './infrastructure/repositories/MongoProductRepository';
import { RedisCacheService } from './infrastructure/storage/RedisCacheService';
import { KafkaMessageBus } from './infrastructure/messaging/KafkaMessageBus';
import { CreateProductUseCase, GetProductUseCase, UpdateProductUseCase } from './application/use-cases/ProductUseCases';
import { DeleteProductUseCase } from './application/use-cases/DeleteProductUseCase';
import { ProductEventPublisher } from './application/events/ProductEventPublisher';
import { ProductController } from './presentation/controllers/ProductController';
import { setupProductRoutes } from './presentation/routes/ProductRoutes';

const container = new Container();

// Infrastructure
container.bind<IProductRepository>('IProductRepository').to(MongoProductRepository).inSingletonScope();
container.bind<ICacheService>('ICacheService').to(RedisCacheService).inSingletonScope();
container.bind<IMessageBus>('IMessageBus').to(KafkaMessageBus).inSingletonScope();

// Application
container.bind<ProductEventPublisher>(ProductEventPublisher).toSelf().onActivation((context, publisher) => {
  const messageBus = context.container.get<IMessageBus>('IMessageBus');
  return new ProductEventPublisher(messageBus);
});
container.bind<CreateProductUseCase>(CreateProductUseCase).toSelf();
container.bind<GetProductUseCase>(GetProductUseCase).toSelf();
container.bind<UpdateProductUseCase>(UpdateProductUseCase).toSelf();
container.bind<DeleteProductUseCase>(DeleteProductUseCase).toSelf();

// Presentation
container.bind<ProductController>(ProductController).toSelf();

export { container };
