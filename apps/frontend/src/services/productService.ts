import ApiService from './apiService';
import { Product } from '../types/product';

class ProductService {
  private apiService: ApiService;

  constructor(baseURL = 'http://localhost:3000/api') {
    this.apiService = new ApiService(baseURL);
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.apiService.get<Product[]>('/products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const createdProduct = await this.apiService.post<{ id: string }>('/products', product);

      // Return the full product by fetching it
      return await this.getProductById(createdProduct.id);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      return await this.apiService.get<Product>(`/products/${id}`);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, product: Partial<Pick<Product, 'name' | 'description' | 'price'>>): Promise<Product> {
    try {
      await this.apiService.put(`/products/${id}`, product);
      // Return the updated product
      return await this.getProductById(id);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.apiService.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export default ProductService;