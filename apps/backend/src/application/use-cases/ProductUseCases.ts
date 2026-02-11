import { Product, ProductId, Price } from '../../domain';
import { IProductRepository } from '../../domain/repositories';

export class ProductUseCases {
  constructor(private readonly productRepository: IProductRepository) {}

  async findById(id: ProductId): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async findall(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async create(name: string, priceValue: number, description: string): Promise<Product> {
    const id = ProductId.create();
    const price = Price.create(priceValue);
    const product = Product.create(id, name, price, description);
    return await this.productRepository.save(product);
  }

  async update(id: ProductId, name?: string, priceValue?: number, description?: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');

    if (name) product.updateName(name);
    if (priceValue !== undefined) {
      const price = Price.create(priceValue);
      product.updatePrice(price);
    }
    if (description !== undefined) product.updateDescription(description);

    return await this.productRepository.save(product);
  }

  async delete(id: ProductId): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    await this.productRepository.delete(id);
  }
}
