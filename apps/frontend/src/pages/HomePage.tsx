import React from 'react';
import MainLayout from '../layouts/MainLayout';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Clean Architecture App</h1>
          <p className="text-gray-600 mb-4">
            This is a scalable React application following Clean Architecture principles.
          </p>
          <p className="text-gray-600 mb-4">
            Features include:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Modular component structure</li>
            <li>Separation of concerns</li>
            <li>Scalable directory organization</li>
            <li>CRUD functionality examples</li>
            <li>Authentication ready architecture</li>
          </ul>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/products"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 text-center"
              >
                Manage Products
              </a>
              <a
                href="#"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 text-center"
              >
                Manage Users
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
