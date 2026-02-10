import { Product, ProductId, Price } from '../src/domain';
import { User, UserId, Email } from '../src/domain';

describe('Entities', () => {
  describe('Product', () => {
    let productId: ProductId;
    let price: Price;

    beforeEach(() => {
      productId = ProductId.create();
      price = Price.create(29.99);
    });

    it('should create product', () => {
      const product = Product.create(productId, 'Test Product', price, 'category1');

      expect(product.getId()).toBe(productId);
      expect(product.getName()).toBe('Test Product');
      expect(product.getPrice()).toBe(price);
      expect(product.getCategoryId()).toBe('category1');
      expect(product.getCreatedAt()).toBeInstanceOf(Date);
      expect(product.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should update name', () => {
      const product = Product.create(productId, 'Test Product', price, 'category1');
      const originalUpdatedAt = product.getUpdatedAt();

      // Wait a bit to ensure updatedAt changes
      setTimeout(() => {
        product.updateName('Updated Product');

        expect(product.getName()).toBe('Updated Product');
        expect(product.getUpdatedAt().getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      }, 1);
    });

    it('should update price', () => {
      const product = Product.create(productId, 'Test Product', price, 'category1');
      const newPrice = Price.create(39.99);

      product.updatePrice(newPrice);

      expect(product.getPrice()).toBe(newPrice);
    });

    it('should throw error for empty name on creation', () => {
      expect(() => Product.create(productId, '', price, 'category1')).toThrow('Product name cannot be empty');
    });

    it('should throw error for empty name on update', () => {
      const product = Product.create(productId, 'Test Product', price, 'category1');
      expect(() => product.updateName('')).toThrow('Product name cannot be empty');
    });
  });

  describe('User', () => {
    let userId: UserId;
    let email: Email;

    beforeEach(() => {
      userId = UserId.create();
      email = Email.create('test@example.com');
    });

    it('should create user', () => {
      const user = User.create(userId, 'John Doe', email);

      expect(user.getId()).toBe(userId);
      expect(user.getName()).toBe('John Doe');
      expect(user.getEmail()).toBe(email);
      expect(user.getCreatedAt()).toBeInstanceOf(Date);
      expect(user.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should update name', () => {
      const user = User.create(userId, 'John Doe', email);

      user.updateName('Jane Doe');

      expect(user.getName()).toBe('Jane Doe');
    });

    it('should update email', () => {
      const user = User.create(userId, 'John Doe', email);
      const newEmail = Email.create('jane@example.com');

      user.updateEmail(newEmail);

      expect(user.getEmail()).toBe(newEmail);
    });

    it('should throw error for empty name on creation', () => {
      expect(() => User.create(userId, '', email)).toThrow('User name cannot be empty');
    });

    it('should throw error for empty name on update', () => {
      const user = User.create(userId, 'John Doe', email);
      expect(() => user.updateName('')).toThrow('User name cannot be empty');
    });
  });
});