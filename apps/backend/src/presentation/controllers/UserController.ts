import { Request, Response } from 'express';
import { CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, LoginUserUseCase, LogoutUserUseCase } from '../../application/use-cases/UserUseCases';
import { UserId } from '../../domain';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      if (typeof name !== 'string' || !name.trim()) {
        throw new Error('Name must be a non-empty string');
      }
      if (typeof email !== 'string' || !email.includes('@')) {
        throw new Error('Valid email is required');
      }

      const id = await this.createUserUseCase.execute(name.trim(), email.trim());
      res.status(201).json({ id: id.getValue() });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const id = UserId.fromString(req.params.id as string);
      const user = await this.getUserUseCase.execute(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json({
        id: user.getId().getValue(),
        name: user.getName(),
        email: user.getEmail().getValue(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = UserId.fromString(req.params.id as string);
      const { name, email } = req.body;

      if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
        throw new Error('Name must be a non-empty string');
      }
      if (email !== undefined && (typeof email !== 'string' || !email.includes('@'))) {
        throw new Error('Valid email is required');
      }

      await this.updateUserUseCase.execute(id, name?.trim(), email?.trim());
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (typeof email !== 'string' || !email.includes('@')) {
        throw new Error('Valid email is required');
      }

      const user = await this.loginUserUseCase.execute(email.trim());
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      res.json({
        id: user.getId().getValue(),
        name: user.getName(),
        email: user.getEmail().getValue(),
        message: 'Login successful'
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      await this.logoutUserUseCase.execute();
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}