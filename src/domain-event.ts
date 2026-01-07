import { v7 as uuidv7 } from 'uuid';
import { Id } from './id';

declare const DOMAIN_EVENT_BRAND: unique symbol;

/**
 * Registry that maps event types to their aggregate and payload types.
 * Extend this interface to register new event types.
 */
export interface DomainEventRegistry {
  [key: string]: {
    aggregateId: Id<string | number>;
    payload: unknown;
  };
}

/**
 * Abstract base class for domain events in Domain-Driven Design.
 * A domain event represents something that happened in the domain that
 * domain experts care about. Events are immutable and represent facts.
 *
 * @template TType - The type identifier for the event (must be registered in DomainEventRegistry)
 */
export abstract class DomainEvent<TType extends keyof DomainEventRegistry> {
  private readonly [DOMAIN_EVENT_BRAND]: void;

  /**
   * Type identifier for the event.
   */
  public readonly type: TType;

  /**
   * Unique identifier for this event instance (UUIDv7).
   * @readonly
   */
  public readonly id: string;

  /**
   * The identifier of the aggregate that produced this event.
   * @readonly
   */
  public readonly aggregateId: DomainEventRegistry[TType]['aggregateId'];

  /**
   * The data payload specific to this event.
   * @readonly
   */
  public readonly payload: DomainEventRegistry[TType]['payload'];

  /**
   * The timestamp when this event occurred.
   * @readonly
   */
  public readonly occurredAt: Date;

  /**
   * Creates a new domain event.
   *
   * @param type - The event type identifier
   * @param aggregateId - The ID of the aggregate that produced this event
   * @param payload - The event-specific data
   * @public
   */
  public constructor(
    type: TType,
    aggregateId: DomainEventRegistry[TType]['aggregateId'],
    payload: DomainEventRegistry[TType]['payload'],
  ) {
    this.type = type;
    this.id = uuidv7();
    this.aggregateId = aggregateId;
    this.occurredAt = new Date();
    this.payload = payload;
  }
}

/**
 * Union type representing any domain event registered in the DomainEventRegistry.
 * Useful for type-safe collections and handlers that work with multiple event types.
 */
export type AnyDomainEvent = DomainEvent<keyof DomainEventRegistry>;
