# Clean Architecture Backend API

A TypeScript backend API built with Clean Architecture principles, Domain-Driven Design (DDD), Event-Driven Architecture, and SOLID principles. Features dependency inversion with Inversify, REST endpoints, Kafka messaging, MongoDB persistence, Redis caching, and Blob Storage interface.

## Architecture

- **Domain Layer**: Core business logic, entities, value objects, interfaces.
- **Application Layer**: Use cases, event publishers.
- **Infrastructure Layer**: Implementations (MongoDB, Redis, Kafka).
- **Presentation Layer**: REST controllers, routes, message handlers.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env` and configure environment variables.
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
- Inversify for DI
- UUIDv7 for entity IDs

## API Endpoints

- `POST /api/products`: Create product
- `GET /api/products/:id`: Get product
- `PUT /api/products/:id`: Update product

## ID Generation

Entity IDs use UUIDv7 for time-ordering and uniqueness. Use `ProductId.create()` for new IDs, `ProductId.fromString()` for parsing.