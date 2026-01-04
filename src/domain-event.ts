import { v7 as uuidv7 } from 'uuid';

export declare const DOMAIN_EVENT_BRAND: unique symbol;

export abstract class DomainEvent<TPayload> {
  private readonly [DOMAIN_EVENT_BRAND]: void;

  public static readonly type: string;

  public readonly id: string;
  public readonly aggregateId: string;
  public readonly payload: TPayload;
  public readonly occurredAt: Date;

  protected constructor(aggregateId: string, payload: TPayload) {
    this.id = uuidv7();
    this.aggregateId = aggregateId;
    this.occurredAt = new Date();
    this.payload = payload;
  }

  public get type(): string {
    return (this.constructor as typeof DomainEvent<TPayload>).type;
  }
}
