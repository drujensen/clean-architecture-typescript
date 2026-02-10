import { v7 as uuidv7 } from 'uuid';

export class UserId {
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

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}

export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!value || !value.includes('@')) throw new Error('Invalid email');
    return new Email(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

export class User {
  private constructor(
    private readonly id: UserId,
    private name: string,
    private email: Email,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  static create(id: UserId, name: string, email: Email): User {
    if (!name) throw new Error('User name cannot be empty');
    const now = new Date();
    return new User(id, name, email, now, now);
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  updateName(newName: string): void {
    if (!newName) throw new Error('User name cannot be empty');
    this.name = newName;
    this.updatedAt = new Date();
  }

  getEmail(): Email {
    return this.email;
  }

  updateEmail(newEmail: Email): void {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}