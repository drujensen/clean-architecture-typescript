import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Clean Architecture App. All rights reserved.
          </p>
          <nav className="space-x-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;