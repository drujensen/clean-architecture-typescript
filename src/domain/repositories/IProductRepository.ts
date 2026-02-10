import { Product, ProductId } from '../';

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  delete(id: ProductId): Promise<void>;
}