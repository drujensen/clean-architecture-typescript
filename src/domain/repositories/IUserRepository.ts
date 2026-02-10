import { User, UserId } from '../entities/User';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: UserId): Promise<void>;
}