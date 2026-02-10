import { ProductId, Price } from '../value-objects';

export class Product {
  private constructor(
    private readonly id: ProductId,
    private name: string,
    private price: Price,
    private categoryId: string,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  static create(id: ProductId, name: string, price: Price, categoryId: string): Product {
    const now = new Date();
    if (!name) throw new Error('Product name cannot be empty');
    return new Product(id, name, price, categoryId, now, now);
  }

  getId(): ProductId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  updateName(newName: string): void {
    if (!newName) throw new Error('Product name cannot be empty');
    this.name = newName;
    this.updatedAt = new Date();
  }

  getPrice(): Price {
    return this.price;
  }

  updatePrice(newPrice: Price): void {
    this.price = newPrice;
    this.updatedAt = new Date();
  }

  getCategoryId(): string {
    return this.categoryId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}