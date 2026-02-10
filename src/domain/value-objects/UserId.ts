import { v7 as uuidv7 } from 'uuid';
import { ValueObject } from './index';

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