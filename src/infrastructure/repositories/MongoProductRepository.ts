import { IProductRepository } from '../../domain/repositories';
import { Product, ProductId, Price } from '../../domain/entities';
import mongoose, { Schema } from 'mongoose';

interface IProductDocument {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProductDocument>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model<IProductDocument>('Product', productSchema);

export class MongoProductRepository implements IProductRepository {
  async save(product: Product): Promise<void> {
    await ProductModel.findOneAndUpdate(
      { _id: product.getId().getValue() },
      {
        _id: product.getId().getValue(),
        name: product.getName(),
        price: product.getPrice().getValue(),
        categoryId: product.getCategoryId(),
        createdAt: product.getCreatedAt(),
        updatedAt: product.getUpdatedAt(),
      },
      { upsert: true, new: true }
    );
  }

  async findById(id: ProductId): Promise<Product | null> {
    const doc = await ProductModel.findById(id.getValue());
    if (!doc) return null;
    const product = Product.create(
      ProductId.fromString(doc._id),
      doc.name,
      Price.create(doc.price),
      doc.categoryId
    );
    // Since we're reconstructing, set updatedAt from DB
    (product as any).updatedAt = doc.updatedAt;
    return product;
  }

  async findAll(): Promise<Product[]> {
    const docs = await ProductModel.find();
    return docs.map(doc => {
      const product = Product.create(
        ProductId.fromString(doc._id),
        doc.name,
        Price.create(doc.price),
        doc.categoryId
      );
      (product as any).updatedAt = doc.updatedAt;
      return product;
    });
  }

  async delete(id: ProductId): Promise<void> {
    await ProductModel.findByIdAndDelete(id.getValue());
  }
}