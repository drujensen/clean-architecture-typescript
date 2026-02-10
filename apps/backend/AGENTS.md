# AGENTS.md

This file contains information for AI agents working on this project.

## Project Structure

- `src/domain/`: Core business logic (entities, value objects, interfaces)
- `src/application/`: Use cases and application services
- `src/infrastructure/`: External service implementations (DB, cache, messaging)
- `src/presentation/`: Controllers, routes, middleware

## Coding Standards

- Use UUIDv7 for all entity IDs via value objects (e.g., `ProductId.create()`, `UserId.create()`)
- Follow Clean Architecture: Domain depends on nothing, Application on Domain, Infrastructure on both, Presentation on all
- Use dependency injection with Inversify
- Entities are immutable except for business methods (e.g., `updateName()`)
- Track `createdAt` and `updatedAt` on entities

## Build and Test Commands

- Build: `npm run build`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Test: `npm run test`

## Dependencies

- Production: express, mongoose, redis, kafkajs, inversify, uuid
- Dev: typescript, jest, eslint, nodemon

## Environment Variables

- MONGO_URI
- REDIS_URL
- KAFKA_BROKER
- PORT