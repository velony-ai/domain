import { v7 as uuidv7 } from 'uuid';

export declare const DOMAIN_EVENT_BRAND: unique symbol;

/**
 * Abstract base class for domain events in Domain-Driven Design.
 * A domain event represents something that happened in the domain that
 * domain experts care about. Events are immutable and represent facts.
 *
 * @template TPayload - The type of the event payload containing event-specific data
 */
export abstract class DomainEvent<TPayload> {
  private readonly [DOMAIN_EVENT_BRAND]: void;

  /**
   * Static type identifier for the event class.
   * Should be overridden in concrete event classes.
   */
  public static readonly type: string;

  /**
   * Unique identifier for this event instance (UUIDv7).
   * @readonly
   */
  public readonly id: string;

  /**
   * The identifier of the aggregate that produced this event.
   * @readonly
   */
  public readonly aggregateId: string;

  /**
   * The data payload specific to this event.
   * @readonly
   */
  public readonly payload: TPayload;

  /**
   * The timestamp when this event occurred.
   * @readonly
   */
  public readonly occurredAt: Date;

  /**
   * Creates a new domain event.
   *
   * @param aggregateId - The ID of the aggregate that produced this event
   * @param payload - The event-specific data
   * @protected
   */
  protected constructor(aggregateId: string, payload: TPayload) {
    this.id = uuidv7();
    this.aggregateId = aggregateId;
    this.occurredAt = new Date();
    this.payload = payload;
  }

  /**
   * Gets the type identifier for this event.
   *
   * @returns The event type string from the static type property
   */
  public get type(): string {
    return (this.constructor as typeof DomainEvent<TPayload>).type;
  }
}
