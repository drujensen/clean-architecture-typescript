import { IUserRepository } from '../../domain/repositories';
import { User, UserId, Email } from '../../domain';
import mongoose, { Schema } from 'mongoose';

interface IUserDocument {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<IUserDocument>('User', userSchema);

export class MongoUserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    await UserModel.findOneAndUpdate(
      { _id: user.getId().getValue() },
      {
        _id: user.getId().getValue(),
        name: user.getName(),
        email: user.getEmail().getValue(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
      { upsert: true, new: true }
    );
  }

  async findById(id: UserId): Promise<User | null> {
    const doc = await UserModel.findById(id.getValue());
    if (!doc) return null;
    const user = User.create(
      UserId.fromString(doc._id),
      doc.name,
      Email.create(doc.email)
    );
    // Set updatedAt from DB
    (user as any).updatedAt = doc.updatedAt;
    return user;
  }

  async findAll(): Promise<User[]> {
    const docs = await UserModel.find();
    return docs.map(doc => {
      const user = User.create(
        UserId.fromString(doc._id),
        doc.name,
        Email.create(doc.email)
      );
      (user as any).updatedAt = doc.updatedAt;
      return user;
    });
  }

  async delete(id: UserId): Promise<void> {
    await UserModel.findByIdAndDelete(id.getValue());
  }
}