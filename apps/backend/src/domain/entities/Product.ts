import { ProductId, Price } from '../value-objects';

export class Product {
  private constructor(
    private readonly id: ProductId,
    private name: string,
    private price: Price,
    private description: string,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  static create(id: ProductId, name: string, price: Price, description: string): Product {
    const now = new Date();
    if (!name) throw new Error('Product name cannot be empty');
    return new Product(id, name, price, description, now, now);
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

  getDescription(): string {
    return this.description;
  }

  updateDescription(newDescription: string): void {
    this.description = newDescription;
    this.updatedAt = new Date();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}