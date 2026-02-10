import { ValueObject } from './index';

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