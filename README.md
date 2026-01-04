# @velony/domain

A TypeScript library providing core building blocks for Domain-Driven Design (DDD) applications.

## Installation

```bash
npm install @velony/domain
```

## Features

- **Type-safe** - Full TypeScript support with comprehensive type definitions
- **DDD Patterns** - Implementations of core DDD tactical patterns
- **Immutable** - Value objects and events are immutable by design
- **Minimal dependencies** - Only depends on `uuid` for event ID generation

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
import { AggregateRoot, Id, DomainEvent } from '@velony/domain';

class OrderId extends Id<string> {
  static create(value: string): OrderId {
    return new OrderId(value);
  }
}

class OrderPlacedEvent extends DomainEvent<{ total: number }> {
  static readonly type = 'order.placed';

  constructor(aggregateId: string, total: number) {
    super(aggregateId, { total });
  }
}

class Order extends AggregateRoot<OrderId> {
  constructor(
    id: OrderId,
    private total: number
  ) {
    super(id);
  }

  place(): void {
    this.pushDomainEvent(
      new OrderPlacedEvent(this.id.toString(), this.total)
    );
  }
}

const order = new Order(OrderId.create('order-123'), 100);
order.place();
const events = order.pullDomainEvents();
```

### Domain Event

Represents something significant that happened in the domain.

```typescript
import { DomainEvent } from '@velony/domain';

interface UserRegisteredPayload {
  email: string;
  name: string;
}

class UserRegisteredEvent extends DomainEvent<UserRegisteredPayload> {
  static readonly type = 'user.registered';

  constructor(aggregateId: string, email: string, name: string) {
    super(aggregateId, { email, name });
  }
}

const event = new UserRegisteredEvent('user-123', 'john@example.com', 'John Doe');
console.log(event.id); // UUIDv7
console.log(event.type); // "user.registered"
console.log(event.occurredAt); // Date
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
- `pullDomainEvents(): DomainEvent<any>[]` - Retrieve and clear events
- `pushDomainEvent(event: DomainEvent<any>): void` - Add event (protected)

### `DomainEvent<TPayload>`
- `id: string` - Unique event ID (UUIDv7)
- `aggregateId: string` - ID of the aggregate that produced the event
- `payload: TPayload` - Event-specific data
- `occurredAt: Date` - Timestamp of occurrence
- `type: string` - Event type identifier

## License

MIT

## Repository

[https://github.com/velony-ai/domain](https://github.com/velony-ai/domain)

## Issues

[https://github.com/velony-ai/domain/issues](https://github.com/velony-ai/domain/issues)
