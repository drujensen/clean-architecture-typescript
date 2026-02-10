import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/product';
import ProductService from '../services/productService';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const productService = useMemo(() => new ProductService(), []);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, [productService]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = async (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const createdProduct = await productService.createProduct(newProduct);
      setProducts([...products, createdProduct]);
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      setError(null);
      // Extract only the fields that can be updated
      const updateData = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price
      };
      const product = await productService.updateProduct(updatedProduct.id, updateData);
      setProducts(products.map(p => p.id === product.id ? product : p));
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setError(null);
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    }
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <ProductForm
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                editingProduct={editingProduct}
                onCancelEdit={handleCancelEdit}
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
                      onDelete={(id: string) => handleDeleteProduct(id)}
                      onEdit={handleEditProduct}
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