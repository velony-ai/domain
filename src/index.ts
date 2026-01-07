/**
 * @velony/domain - Domain-Driven Design building blocks
 *
 * This package provides core abstractions for implementing Domain-Driven Design (DDD)
 * patterns in TypeScript applications. It includes base classes for:
 * - Entities: Objects with unique identities
 * - Value Objects: Immutable objects defined by their attributes
 * - Aggregate Roots: Entry points to aggregates that maintain consistency
 * - Domain Events: Represent significant occurrences in the domain
 *
 * @packageDocumentation
 */

export { Entity } from './entity';
export { Id } from './id';
export { ValueObject } from './value-object';
export { PrimitiveValueObject } from './primitive-value-object';
export { AggregateRoot } from './aggregate-root';
export {
  DomainEvent,
  type AnyDomainEvent,
  type DomainEventRegistry,
} from './domain-event';
export { StoragePath } from './value-objects/storage-path.vo';
