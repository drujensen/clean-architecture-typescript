import { v7 as uuidv7 } from 'uuid';

export class ProductId {
  private constructor(private readonly value: string) {}

  static create(): ProductId {
    return new ProductId(uuidv7());
  }

  static fromString(value: string): ProductId {
    if (!value) throw new Error('ProductId cannot be empty');
    return new ProductId(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}

export class Price {
  private constructor(private readonly value: number) {}

  static create(value: number): Price {
    if (value < 0) throw new Error('Price cannot be negative');
    return new Price(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Price): boolean {
    return this.value === other.value;
  }
}

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