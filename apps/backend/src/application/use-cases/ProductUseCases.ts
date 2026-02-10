import { Product, ProductId, Price } from '../../domain';
import { IProductRepository } from '../../domain/repositories';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(name: string, priceValue: number, description: string): Promise<ProductId> {
    const id = ProductId.create();
    const price = Price.create(priceValue);
    const product = Product.create(id, name, price, description);
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

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: ProductId, name?: string, priceValue?: number, description?: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');

    if (name) product.updateName(name);
    if (priceValue !== undefined) {
      const price = Price.create(priceValue);
      product.updatePrice(price);
    }
    if (description !== undefined) product.updateDescription(description);

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