import { type AnyDomainEvent } from './domain-event';
import { Entity } from './entity';
import { Id } from './id';

declare const AGGREGATE_ROOT_BRAND: unique symbol;

/**
 * Abstract base class for aggregate roots in Domain-Driven Design.
 * An aggregate root is the entry point to an aggregate and is responsible for
 * maintaining the consistency of the aggregate boundary.
 * It manages domain events that occur within the aggregate.
 *
 * @template TIdentifier - The type of identifier for the aggregate root, must extend Id
 * @extends Entity
 */
export abstract class AggregateRoot<
  TIdentifier extends Id<string | number>,
> extends Entity<TIdentifier> {
  private readonly [AGGREGATE_ROOT_BRAND]: void;

  /**
   * Collection of domain events that have occurred within this aggregate.
   * @private
   */
  private _domainEvents: AnyDomainEvent[] = [];

  /**
   * Retrieves and clears all pending domain events from the aggregate.
   * This method is typically called by infrastructure code after persisting
   * the aggregate to publish the events.
   *
   * @returns An array of domain events that occurred within the aggregate
   */
  public pullDomainEvents(): AnyDomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  /**
   * Adds a domain event to the aggregate's event collection.
   * Protected to allow only the aggregate itself to record events.
   *
   * @param event - The domain event to add
   * @protected
   */
  protected pushDomainEvent(event: AnyDomainEvent): void {
    this._domainEvents.push(event);
  }
}
