import { DomainEvent } from './domain-event';
import { Entity } from './entity';
import { Id } from './id';

declare const AGGREGATE_ROOT_BRAND: unique symbol;

export abstract class AggregateRoot<
  TIdentifier extends Id<string | number>,
> extends Entity<TIdentifier> {
  private readonly [AGGREGATE_ROOT_BRAND]: void;

  private _domainEvents: DomainEvent<any>[] = [];

  public pullDomainEvents(): DomainEvent<any>[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  protected pushDomainEvent(event: DomainEvent<any>): void {
    this._domainEvents.push(event);
  }
}
