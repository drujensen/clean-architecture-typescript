
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoProductRepository } from './infrastructure/repositories/MongoProductRepository';
import { MongoUserRepository } from './infrastructure/repositories/MongoUserRepository';
import { CreateProductUseCase, GetProductUseCase, UpdateProductUseCase, DeleteProductUseCase } from './application/use-cases/ProductUseCases';
import { CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, LoginUserUseCase, LogoutUserUseCase } from './application/use-cases/UserUseCases';
import { ProductController } from './presentation/controllers/ProductController';
import { UserController } from './presentation/controllers/UserController';
import { setupProductRoutes } from './presentation/routes/ProductRoutes';
import { setupUserRoutes } from './presentation/routes/UserRoutes';

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

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);
const logoutUserUseCase = new LogoutUserUseCase();
const userController = new UserController(createUserUseCase, getUserUseCase, updateUserUseCase, loginUserUseCase, logoutUserUseCase);
const userRoutes = setupUserRoutes(userController);

app.use('/api', productRoutes);
app.use('/api', userRoutes);

// TODO: Add Kafka event handling back when DI is fixed

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
