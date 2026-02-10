import { ValueObject } from './index';

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