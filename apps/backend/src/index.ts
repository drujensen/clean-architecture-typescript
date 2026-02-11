
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoProductRepository } from './infrastructure/repositories/MongoProductRepository';
import { ProductUseCases } from './application/use-cases/ProductUseCases';
import { ProductController } from './presentation/controllers/ProductController';
import { setupProductRoutes } from './presentation/routes/ProductRoutes';

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend and backend origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clean-architecture')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const productRepository = new MongoProductRepository();
const productUseCases = new ProductUseCases(productRepository);
const productController = new ProductController(productUseCases);
const productRoutes = setupProductRoutes(productController);


app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
