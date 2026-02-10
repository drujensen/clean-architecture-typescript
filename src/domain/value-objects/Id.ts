import { v7 as uuidv7 } from 'uuid';
import { ValueObject } from './index';

export class Id implements ValueObject {
  private constructor(private readonly value: string) {}

  static create(): Id {
    return new Id(uuidv7());
  }

  static fromString(value: string): Id {
    if (!value) throw new Error('Id cannot be empty');
    return new Id(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ValueObject): boolean {
    return other instanceof Id && other.value === this.value;
  }
}