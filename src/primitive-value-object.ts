import { ValueObject } from './value-object';

const PRIMITIVE_VO_BRAND = Symbol('PrimitiveValueObject');

/**
 * Abstract base class for value objects wrapping primitive values.
 * This class provides a convenient base for value objects that wrap
 * primitive types (string, number, or boolean) with default implementations
 * for equality and string conversion.
 *
 * @template T - The primitive type of the wrapped value (string, number, or boolean)
 * @extends ValueObject
 */
export abstract class PrimitiveValueObject<
  T extends string | number | boolean,
> extends ValueObject<T> {
  private readonly [PRIMITIVE_VO_BRAND]: void;

  /**
   * Checks if this value object is equal to another by comparing primitive values.
   * Uses strict equality (===) for comparison.
   *
   * @param other - The value object to compare with
   * @returns True if the primitive values are strictly equal, false otherwise
   */
  public equals(other: this): boolean {
    return this._value === other._value;
  }

  /**
   * Returns a string representation of the primitive value.
   *
   * @returns The string representation of the wrapped primitive value
   */
  public toString(): string {
    return String(this._value);
  }
}
