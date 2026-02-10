import React, { useState } from 'react';
import { Product } from '../types/product';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, onUpdateProduct }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      ...formData,
      id: Date.now() // Simple ID generation for demo purposes
    };

    if (isEditing) {
      onUpdateProduct(newProduct);
      setIsEditing(false);
    } else {
      onAddProduct(newProduct);
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: 0
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      description: '',
      price: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;