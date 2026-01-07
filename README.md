# @velony/domain

A TypeScript library providing core building blocks for Domain-Driven Design (DDD) applications.

## Installation

```bash
npm install @velony/domain
```

## Core Concepts

### Entity

An object with a distinct identity that runs through time and different states.

```typescript
import { Entity, Id } from '@velony/domain';

class UserId extends Id<string> {
  static create(value: string): UserId {
    return new UserId(value);
  }
}

class User extends Entity<UserId> {
  constructor(
    id: UserId,
    private name: string,
    private email: string
  ) {
    super(id);
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
}

const userId = UserId.create('user-123');
const user = new User(userId, 'John Doe', 'john@example.com');
```

### Value Object

An immutable object defined by its attributes rather than a unique identifier.

```typescript
import { ValueObject } from '@velony/domain';

class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): Email {
    if (!value.includes('@')) {
      throw new Error('Invalid email format');
    }
    return new Email(value);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

const email = Email.create('user@example.com');
```

### Primitive Value Object

A convenient base class for value objects wrapping primitive types.

```typescript
import { PrimitiveValueObject } from '@velony/domain';

class Age extends PrimitiveValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(value: number): Age {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    return new Age(value);
  }
}

const age = Age.create(25);
console.log(age.toString()); // "25"
```

### Aggregate Root

The entry point to an aggregate that maintains consistency boundaries and manages domain events.

```typescript
import { AggregateRoot, Id, DomainEvent, DomainEventRegistry } from '@velony/domain';

class OrderId extends Id<string> {
  static create(value: string): OrderId {
    return new OrderId(value);
  }
}

// Register the event type in the registry
declare module '@velony/domain' {
  interface DomainEventRegistry {
    'order.placed': {
      aggregateId: OrderId;
      payload: { total: number };
    };
  }
}

class OrderPlacedEvent extends DomainEvent<'order.placed'> {}

class Order extends AggregateRoot<OrderId> {
  constructor(
    id: OrderId,
    private total: number
  ) {
    super(id);
  }

  place(): void {
    this.pushDomainEvent(
      new OrderPlacedEvent('order.placed', this.id, { total: this.total })
    );
  }
}

const order = new Order(OrderId.create('order-123'), 100);
order.place();
const events = order.pullDomainEvents();
```

### Domain Event

Represents something significant that happened in the domain. Events use a type-safe registry pattern for compile-time validation.

```typescript
import { DomainEvent, DomainEventRegistry, Id } from '@velony/domain';

class UserId extends Id<string> {
  static create(value: string): UserId {
    return new UserId(value);
  }
}

// Register event types in the DomainEventRegistry
declare module '@velony/domain' {
  interface DomainEventRegistry {
    'user.registered': {
      aggregateId: UserId;
      payload: {
        email: string;
        name: string;
      };
    };
  }
}

class UserRegisteredEvent extends DomainEvent<'user.registered'> {}

const userId = UserId.create('user-123');
const event = new UserRegisteredEvent('user.registered', userId, {
  email: 'john@example.com',
  name: 'John Doe'
});
console.log(event.id); // UUIDv7
console.log(event.type); // "user.registered"
console.log(event.occurredAt); // Date
console.log(event.aggregateId); // UserId instance
console.log(event.payload); // { email: "john@example.com", name: "John Doe" }
```

### StoragePath

A built-in value object for safe storage paths.

```typescript
import { StoragePath } from '@velony/domain';

const path = StoragePath.create('uploads/images/photo.jpg');
console.log(path.extension); // "jpg"
console.log(path.toUrl('https://storage.example.com')); 
// "https://storage.example.com/uploads/images/photo.jpg"

// Validation prevents unsafe paths
StoragePath.create('/etc/passwd'); // Error: Storage path should not start with /
StoragePath.create('../secrets'); // Error: Storage path cannot contain ..
StoragePath.create('files//data'); // Error: Storage path contains invalid double slashes
```

## API Reference

### `Entity<TIdentifier>`
- `id: TIdentifier` - The unique identifier
- `equals(other: this): boolean` - Compare entities by identity

### `ValueObject<TValue>`
- `value: TValue` - The wrapped value
- `equals(other: this): boolean` - Compare by value (abstract)
- `toString(): string` - String representation (abstract)

### `PrimitiveValueObject<T>`
- Extends `ValueObject<T>` with default implementations for primitives
- `equals(other: this): boolean` - Compares using strict equality
- `toString(): string` - Converts value to string

### `Id<T>`
- Extends `PrimitiveValueObject<T>` for entity identifiers

### `AggregateRoot<TIdentifier>`
- Extends `Entity<TIdentifier>`
- `pullDomainEvents(): AnyDomainEvent[]` - Retrieve and clear events
- `pushDomainEvent(event: AnyDomainEvent): void` - Add event (public)

### `DomainEvent<TType>`
- `id: string` - Unique event ID (UUIDv7)
- `type: TType` - Type identifier for the event (must be registered in DomainEventRegistry)
- `aggregateId: DomainEventRegistry[TType]['aggregateId']` - ID of the aggregate that produced the event
- `payload: DomainEventRegistry[TType]['payload']` - Event-specific data
- `occurredAt: Date` - Timestamp of occurrence

### `DomainEventRegistry`
Interface for registering event types with their aggregate ID and payload types. Extend this interface using module augmentation to register new event types:

```typescript
declare module '@velony/domain' {
  interface DomainEventRegistry {
    'your.event.type': {
      aggregateId: YourAggregateId;
      payload: YourPayloadType;
    };
  }
}
```

## License

MIT

## Repository

[https://github.com/velony-ai/domain](https://github.com/velony-ai/domain)

## Issues

[https://github.com/velony-ai/domain/issues](https://github.com/velony-ai/domain/issues)
