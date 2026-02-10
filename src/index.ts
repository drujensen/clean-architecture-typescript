
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoProductRepository } from './infrastructure/repositories/MongoProductRepository';
import { CreateProductUseCase, GetProductUseCase, UpdateProductUseCase, DeleteProductUseCase } from './application';
import { ProductController } from './presentation/controllers/ProductController';
import { setupProductRoutes } from './presentation/routes/ProductRoutes';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clean-architecture')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Manual instantiation for testing
const productRepository = new MongoProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const productController = new ProductController(createProductUseCase, getProductUseCase, updateProductUseCase, deleteProductUseCase);
const productRoutes = setupProductRoutes(productController);
app.use('/api', productRoutes);

// TODO: Add Kafka event handling back when DI is fixed

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
