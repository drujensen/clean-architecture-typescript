import { CreateProductUseCase, GetProductUseCase, UpdateProductUseCase, DeleteProductUseCase } from '../../src/application/use-cases/ProductUseCases';
import { CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, LoginUserUseCase } from '../../src/application/use-cases/UserUseCases';
import { Product, ProductId, Price } from '../../src/domain';
import { User, UserId, Email } from '../../src/domain';

// Mock repository interface
interface MockProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  delete(id: ProductId): Promise<void>;
}

interface MockUserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: UserId): Promise<void>;
}

describe('Use Cases', () => {
  describe('Product Use Cases', () => {
    let mockProductRepo: jest.Mocked<MockProductRepository>;
    let createProductUseCase: CreateProductUseCase;
    let getProductUseCase: GetProductUseCase;
    let updateProductUseCase: UpdateProductUseCase;
    let deleteProductUseCase: DeleteProductUseCase;

    beforeEach(() => {
      mockProductRepo = {
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
      };

      createProductUseCase = new CreateProductUseCase(mockProductRepo);
      getProductUseCase = new GetProductUseCase(mockProductRepo);
      updateProductUseCase = new UpdateProductUseCase(mockProductRepo);
      deleteProductUseCase = new DeleteProductUseCase(mockProductRepo);
    });

    describe('CreateProductUseCase', () => {
      it('should create and save product', async () => {
        const result = await createProductUseCase.execute('Test Product', 29.99, 'category1');

        expect(result).toBeInstanceOf(ProductId);
        expect(mockProductRepo.save).toHaveBeenCalledWith(
          expect.objectContaining({
            getName: expect.any(Function),
          })
        );

        const savedProduct = mockProductRepo.save.mock.calls[0][0];
        expect(savedProduct.getName()).toBe('Test Product');
        expect(savedProduct.getPrice().getValue()).toBe(29.99);
      });

      it('should throw error for invalid input', async () => {
        await expect(createProductUseCase.execute('', 29.99, 'category1')).rejects.toThrow();
        await expect(createProductUseCase.execute('Test', -10, 'category1')).rejects.toThrow();
      });
    });

    describe('GetProductUseCase', () => {
      it('should return product when found', async () => {
        const productId = ProductId.create();
        const product = Product.create(productId, 'Test Product', Price.create(29.99), 'category1');
        mockProductRepo.findById.mockResolvedValue(product);

        const result = await getProductUseCase.execute(productId);

        expect(result).toBe(product);
        expect(mockProductRepo.findById).toHaveBeenCalledWith(productId);
      });

      it('should return null when product not found', async () => {
        const productId = ProductId.create();
        mockProductRepo.findById.mockResolvedValue(null);

        const result = await getProductUseCase.execute(productId);

        expect(result).toBeNull();
      });
    });

    describe('UpdateProductUseCase', () => {
      it('should update product name', async () => {
        const productId = ProductId.create();
        const product = Product.create(productId, 'Old Name', Price.create(29.99), 'category1');
        mockProductRepo.findById.mockResolvedValue(product);

        await updateProductUseCase.execute(productId, 'New Name');

        expect(product.getName()).toBe('New Name');
        expect(mockProductRepo.save).toHaveBeenCalledWith(product);
      });

      it('should update product price', async () => {
        const productId = ProductId.create();
        const product = Product.create(productId, 'Test Product', Price.create(29.99), 'category1');
        mockProductRepo.findById.mockResolvedValue(product);

        await updateProductUseCase.execute(productId, undefined, 39.99);

        expect(product.getPrice().getValue()).toBe(39.99);
        expect(mockProductRepo.save).toHaveBeenCalledWith(product);
      });

      it('should throw error when product not found', async () => {
        const productId = ProductId.create();
        mockProductRepo.findById.mockResolvedValue(null);

        await expect(updateProductUseCase.execute(productId, 'New Name')).rejects.toThrow('Product not found');
      });
    });

    describe('DeleteProductUseCase', () => {
      it('should delete existing product', async () => {
        const productId = ProductId.create();
        const product = Product.create(productId, 'Test Product', Price.create(29.99), 'category1');
        mockProductRepo.findById.mockResolvedValue(product);

        await deleteProductUseCase.execute(productId);

        expect(mockProductRepo.delete).toHaveBeenCalledWith(productId);
      });

      it('should throw error when product not found', async () => {
        const productId = ProductId.create();
        mockProductRepo.findById.mockResolvedValue(null);

        await expect(deleteProductUseCase.execute(productId)).rejects.toThrow('Product not found');
      });
    });
  });

  describe('User Use Cases', () => {
    let mockUserRepo: jest.Mocked<MockUserRepository>;
    let createUserUseCase: CreateUserUseCase;
    let getUserUseCase: GetUserUseCase;
    let updateUserUseCase: UpdateUserUseCase;
    let loginUserUseCase: LoginUserUseCase;

    beforeEach(() => {
      mockUserRepo = {
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
      };

      createUserUseCase = new CreateUserUseCase(mockUserRepo);
      getUserUseCase = new GetUserUseCase(mockUserRepo);
      updateUserUseCase = new UpdateUserUseCase(mockUserRepo);
      loginUserUseCase = new LoginUserUseCase(mockUserRepo);
    });

    describe('CreateUserUseCase', () => {
      it('should create and save user', async () => {
        const result = await createUserUseCase.execute('John Doe', 'john@example.com');

        expect(result).toBeInstanceOf(UserId);
        expect(mockUserRepo.save).toHaveBeenCalledWith(
          expect.objectContaining({
            getName: expect.any(Function),
          })
        );

        const savedUser = mockUserRepo.save.mock.calls[0][0];
        expect(savedUser.getName()).toBe('John Doe');
        expect(savedUser.getEmail().getValue()).toBe('john@example.com');
      });

      it('should throw error for invalid input', async () => {
        await expect(createUserUseCase.execute('', 'john@example.com')).rejects.toThrow();
        await expect(createUserUseCase.execute('John', 'invalid-email')).rejects.toThrow();
      });
    });

    describe('LoginUserUseCase', () => {
      it('should return user for valid email', async () => {
        const userId = UserId.create();
        const email = Email.create('john@example.com');
        const user = User.create(userId, 'John Doe', email);
        mockUserRepo.findAll.mockResolvedValue([user]);

        const result = await loginUserUseCase.execute('john@example.com');

        expect(result).toBe(user);
      });

      it('should return null for invalid email', async () => {
        mockUserRepo.findAll.mockResolvedValue([]);

        const result = await loginUserUseCase.execute('invalid@example.com');

        expect(result).toBeNull();
      });
    });
  });
});