# Clean Architecture Backend API

A TypeScript backend API built with Clean Architecture principles, Domain-Driven Design (DDD), Event-Driven Architecture, and SOLID principles. Features manual dependency injection, REST endpoints, Kafka messaging, MongoDB persistence, Redis caching, and Blob Storage interface.

## Architecture

- **Domain Layer**: Core business logic, entities, value objects, interfaces.
- **Application Layer**: Use cases, event publishers.
- **Infrastructure Layer**: External implementations (MongoDB, Redis, Kafka).
- **Presentation Layer**: REST controllers, routes, message handlers.

Dependencies are manually injected at application startup, following Go-style dependency management.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env-example` to `.env` and configure environment variables:
   ```bash
   cp .env-example .env
   ```
3. Run with Docker: `docker-compose up`
4. Or run locally: `npm run dev`

## Scripts

- `npm run build`: Compile TypeScript
- `npm run start`: Run production build
- `npm run dev`: Run development server with nodemon
- `npm run test`: Run Jest tests
- `npm run lint`: Run ESLint

## Technologies

- TypeScript
- Express.js
- MongoDB with Mongoose
- Redis
- Kafka with Kafkajs
- Manual Dependency Injection
- UUIDv7 for entity IDs

## API Endpoints

### Products
- `POST /api/products`: Create product
- `GET /api/products/:id`: Get product
- `PUT /api/products/:id`: Update product
- `DELETE /api/products/:id`: Delete product

### Users
- `POST /api/users`: Create user
- `GET /api/users/:id`: Get user
- `PUT /api/users/:id`: Update user profile

### Authentication
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout

## HTTP Test Files

Organized test files for API endpoints:

- `http/product/`: Product CRUD operations
- `http/user/`: User management and authentication

Use VS Code REST Client or similar tools to run these tests.

## ID Generation

Entity IDs use UUIDv7 for time-ordering and uniqueness. Use `ProductId.create()` for new IDs, `ProductId.fromString()` for parsing.