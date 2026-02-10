import { User, UserId, Email } from '../../domain';
import { IUserRepository } from '../../domain/repositories';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(name: string, emailValue: string): Promise<UserId> {
    const id = UserId.create();
    const email = Email.create(emailValue);
    const user = User.create(id, name, email);
    await this.userRepository.save(user);
    return id;
  }
}

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: UserId): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: UserId, name?: string, emailValue?: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    if (name) user.updateName(name);
    if (emailValue) {
      const email = Email.create(emailValue);
      user.updateEmail(email);
    }

    await this.userRepository.save(user);
  }
}

export class LoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(emailValue: string): Promise<User | null> {
    // Simple authentication - just check if user exists with email
    // In real app, this would check password hash
    const email = Email.create(emailValue);
    const users = await this.userRepository.findAll();
    return users.find(user => user.getEmail().equals(email)) || null;
  }
}

export class LogoutUserUseCase {
  // Stateless logout - in real app, this might invalidate tokens
  async execute(): Promise<void> {
    // No-op for this example
  }
}