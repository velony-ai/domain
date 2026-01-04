import { Id } from './id';

declare const ENTITY_BRAND: unique symbol;

export abstract class Entity<TIdentifier extends Id<string | number>> {
  private readonly [ENTITY_BRAND]: void;

  protected readonly _id: TIdentifier;

  protected constructor(id: TIdentifier) {
    this._id = id;
  }

  public get id(): TIdentifier {
    return this._id;
  }

  public equals(other: this): boolean {
    return this._id.equals(other._id);
  }
}
