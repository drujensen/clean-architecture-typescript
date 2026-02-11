import { Request, Response } from 'express';
import { ProductUseCases } from '../../application/use-cases/ProductUseCases';
import { ProductId } from '../../domain';

export class ProductController {
  constructor(
    private readonly productUseCases: ProductUseCases,
  ) {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productUseCases.findall();
      res.json(products.map(product => ({
        id: product.getId().getValue(),
        name: product.getName(),
        price: product.getPrice().getValue(),
        description: product.getDescription(),
        createdAt: product.getCreatedAt(),
        updatedAt: product.getUpdatedAt(),
      })));
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = ProductId.fromString(req.params.id as string);
      const product = await this.productUseCases.findById(id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json({
        id: product.getId().getValue(),
        name: product.getName(),
        price: product.getPrice().getValue(),
        description: product.getDescription(),
        createdAt: product.getCreatedAt(),
        updatedAt: product.getUpdatedAt(),
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price, description } = req.body;

      // Validate input types
      if (typeof name !== 'string' || !name.trim()) {
        throw new Error('Name must be a non-empty string');
      }
      if (typeof price !== 'number' || price <= 0) {
        throw new Error('Price must be a positive number');
      }
      if (typeof description !== 'string') {
        throw new Error('Description must be a string');
      }

      const product = await this.productUseCases.create(name.trim(), price, description);

      res.status(201).json({
        id: product.getId().getValue(),
        name: product.getName(),
        price: product.getPrice().getValue(),
        description: product.getDescription(),
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
      const { name, price, description } = req.body;

      // Validate input types if provided
      if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
        throw new Error('Name must be a non-empty string');
      }
      if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
        throw new Error('Price must be a positive number');
      }
      if (description !== undefined && typeof description !== 'string') {
        throw new Error('Description must be a string');
      }

      const updatedProduct = await this.productUseCases.update(id, name?.trim(), price, description);

      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found after update' });
        return;
      }

      res.json({
        id: updatedProduct.getId().getValue(),
        name: updatedProduct.getName(),
        price: updatedProduct.getPrice().getValue(),
        description: updatedProduct.getDescription(),
        createdAt: updatedProduct.getCreatedAt(),
        updatedAt: updatedProduct.getUpdatedAt(),
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = ProductId.fromString(req.params.id as string);
      await this.productUseCases.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
