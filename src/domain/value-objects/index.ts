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

export class UserId implements ValueObject {
  private constructor(private readonly value: string) {}

  static create(): UserId {
    return new UserId(uuidv7());
  }

  static fromString(value: string): UserId {
    if (!value) throw new Error('UserId cannot be empty');
    return new UserId(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ValueObject): boolean {
    return other instanceof UserId && other.value === this.value;
  }
}

export class Email implements ValueObject {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!value || !value.includes('@')) throw new Error('Invalid email');
    return new Email(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ValueObject): boolean {
    return other instanceof Email && other.value === this.value;
  }
}

export class Price implements ValueObject {
  private constructor(private readonly value: number) {}

  static create(value: number): Price {
    if (value < 0) throw new Error('Price cannot be negative');
    return new Price(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ValueObject): boolean {
    return other instanceof Price && other.value === this.value;
  }
}