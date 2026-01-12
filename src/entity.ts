import { Id } from './id';

const ENTITY_BRAND = Symbol('Entity');

/**
 * Abstract base class for entities in Domain-Driven Design.
 * An entity is an object that has a distinct identity that runs through time
 * and different states. Two entities with different identifiers are considered
 * different even if all other attributes are the same.
 *
 * @template TIdentifier - The type of identifier for the entity, must extend Id
 */
export abstract class Entity<TIdentifier extends Id<string | number>> {
  private readonly [ENTITY_BRAND]: void;

  /**
   * The unique identifier for this entity.
   * @protected
   */
  protected readonly _id: TIdentifier;

  /**
   * Creates a new entity with the given identifier.
   *
   * @param id - The unique identifier for this entity
   * @protected
   */
  protected constructor(id: TIdentifier) {
    this._id = id;
  }

  /**
   * Gets the unique identifier of this entity.
   *
   * @returns The entity's identifier
   */
  public get id(): TIdentifier {
    return this._id;
  }

  /**
   * Checks if this entity is equal to another entity.
   * Two entities are equal if they have the same identifier.
   *
   * @param other - The entity to compare with
   * @returns True if the entities have the same identifier, false otherwise
   */
  public equals(other: this): boolean {
    return this._id.equals(other._id);
  }
}
