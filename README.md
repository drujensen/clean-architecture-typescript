# Clean Architecture Mono-Repo

A mono-repo containing a TypeScript backend API (Clean Architecture with DDD) and a React frontend.

## Backend

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
3. For backend: Run with Docker: `docker-compose up` (in apps/backend/)
4. Or run backend locally: `npm run dev:backend`
5. For frontend: 
   - First build the application: `npm run build:frontend`
   - Then run development server: `npm run dev:frontend`

## Scripts

- `npm run build`: Build all workspaces
- `npm run test`: Run tests in all workspaces
- `npm run lint`: Run linting in all workspaces
- `npm run dev:backend`: Run backend development server
- Backend-specific (in apps/backend/): `npm run build`, `npm run start`, `npm run dev`, `npm run test`, `npm run lint`

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

- `tests/http/product/`: Product CRUD operations
- `tests/http/user/`: User management and authentication

Use VS Code REST Client or similar tools to run these tests.

## Testing

The project includes comprehensive unit tests covering:

- **Value Objects**: ID generation, validation, equality
- **Entities**: Business rules, state changes
- **Use Cases**: Application logic with mocked dependencies

Run tests:
```bash
npm test
```

Run with coverage:
```bash
npm run test -- --coverage
```

## ID Generation

Entity IDs use UUIDv7 for time-ordering and uniqueness. Use `ProductId.create()` for new IDs, `ProductId.fromString()` for parsing.