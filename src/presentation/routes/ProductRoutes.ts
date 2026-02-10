import express from 'express';
import { ProductController } from '../controllers/ProductController';

export function setupProductRoutes(productController: ProductController): express.Router {
  const router = express.Router();

  router.post('/products', productController.createProduct.bind(productController));
  router.get('/products/:id', productController.getProduct.bind(productController));
  router.put('/products/:id', productController.updateProduct.bind(productController));
  router.delete('/products/:id', productController.deleteProduct.bind(productController));

  return router;
}