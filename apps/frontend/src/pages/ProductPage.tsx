import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/product';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API service
  useEffect(() => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 1200 },
      { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 800 },
      { id: 3, name: 'Tablet', description: '10-inch tablet with stylus', price: 400 },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory with CRUD operations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <ProductForm
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Product List</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {products.length} products
                </span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No products found.</p>
                  <p className="text-gray-400 text-sm">Add a new product using the form on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;