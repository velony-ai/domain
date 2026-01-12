import { PrimitiveValueObject } from './primitive-value-object.js';

const ID_BRAND = Symbol('Id');

/**
 * Abstract base class for entity identifiers.
 * Represents a unique identifier for domain entities, ensuring type safety
 * and proper value object semantics for IDs.
 *
 * @template T - The primitive type of the identifier (string or number)
 * @extends PrimitiveValueObject
 */
export abstract class Id<
  T extends string | number,
> extends PrimitiveValueObject<T> {
  private readonly [ID_BRAND]: void;
}
