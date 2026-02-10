import { v7 as uuidv7 } from 'uuid';

export interface ValueObject {
  equals(other: ValueObject): boolean;
}

export class ProductId implements ValueObject {
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

  equals(other: ValueObject): boolean {
    return other instanceof ProductId && other.value === this.value;
  }
}