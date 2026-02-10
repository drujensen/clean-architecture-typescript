import { Request, Response } from 'express';
import { CreateProductUseCase, GetProductUseCase, UpdateProductUseCase } from '../../application/use-cases/ProductUseCases';
import { DeleteProductUseCase } from '../../application/use-cases/DeleteProductUseCase';
import { ProductId } from '../../domain';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price, categoryId } = req.body;

      // Validate input types
      if (typeof name !== 'string' || !name.trim()) {
        throw new Error('Name must be a non-empty string');
      }
      if (typeof price !== 'number' || price <= 0) {
        throw new Error('Price must be a positive number');
      }
      if (!categoryId) {
        throw new Error('CategoryId is required');
      }

      const categoryIdStr = categoryId.toString();
      const id = await this.createProductUseCase.execute(name.trim(), price, categoryIdStr);
      res.status(201).json({ id: id.getValue() });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = ProductId.fromString(req.params.id as string);
      const product = await this.getProductUseCase.execute(id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json({
        id: product.getId().getValue(),
        name: product.getName(),
        price: product.getPrice().getValue(),
        categoryId: product.getCategoryId(),
        createdAt: product.getCreatedAt(),
        updatedAt: product.getUpdatedAt(),
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = ProductId.fromString(req.params.id as string);
      const { name, price } = req.body;

      // Validate input types if provided
      if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
        throw new Error('Name must be a non-empty string');
      }
      if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
        throw new Error('Price must be a positive number');
      }

      await this.updateProductUseCase.execute(id, name?.trim(), price);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = ProductId.fromString(req.params.id as string);
      await this.deleteProductUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}