export interface ValueObject {
  equals(other: ValueObject): boolean;
}

export class Email implements ValueObject {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: ValueObject): boolean {
    return other instanceof Email && other._value === this._value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export class UserId implements ValueObject {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: ValueObject): boolean {
    return other instanceof UserId && other._value === this._value;
  }
}