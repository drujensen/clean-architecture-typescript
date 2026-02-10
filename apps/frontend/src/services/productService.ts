import ApiService from './apiService';
import { Product } from '../types/product';

class ProductService {
  // @ts-ignore - apiService will be used when switching to real API calls
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      // In a real app, this would call the actual API
      // return await this.apiService.get<Product[]>('/products');

      // Mock data for now
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 1200 },
            { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 800 },
            { id: 3, name: 'Tablet', description: '10-inch tablet with stylus', price: 400 },
          ]);
        }, 500);
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      // In a real app: return await this.apiService.post<Product>('/products', product);
      return { ...product, id: Date.now() };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      // In a real app: return await this.apiService.put<Product>(`/products/${product.id}`, product);
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(_id: number): Promise<void> {
    try {
      // In a real app: await this.apiService.delete(`/products/${_id}`);
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export default ProductService;