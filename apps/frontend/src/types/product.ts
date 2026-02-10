export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  description?: string; // Optional for frontend use
}