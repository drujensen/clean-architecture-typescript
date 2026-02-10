export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

// For backward compatibility with existing data that might not have description
export interface ProductResponse extends Omit<Product, 'description'> {
  description?: string;
}