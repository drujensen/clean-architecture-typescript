import { Product, ProductId, Price } from '../../domain';
import { IProductRepository } from '../../domain/repositories';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(name: string, priceValue: number, categoryId: string): Promise<ProductId> {
    const id = ProductId.create();
    const price = Price.create(priceValue);
    const product = Product.create(id, name, price, categoryId);
    await this.productRepository.save(product);

    return id;
  }
}

export class GetProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: ProductId): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: ProductId, name?: string, priceValue?: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');

    if (name) product.updateName(name);
    if (priceValue !== undefined) {
      const price = Price.create(priceValue);
      product.updatePrice(price);
    }

    await this.productRepository.save(product);
  }
}

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: ProductId): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    await this.productRepository.delete(id);
  }
}