import { ProductId } from '../../domain';
import { IProductRepository } from '../../domain/repositories';
import { inject } from 'inversify';

export class DeleteProductUseCase {
  constructor(
    @inject('IProductRepository') private readonly productRepository: IProductRepository
  ) {}

  async execute(id: ProductId): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    await this.productRepository.delete(id);
  }
}