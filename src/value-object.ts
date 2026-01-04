declare const VO_BRAND: unique symbol;

/**
 * Abstract base class for value objects in Domain-Driven Design.
 * A value object is an immutable object that represents a descriptive aspect
 * of the domain with no conceptual identity. Value objects are defined by
 * their attributes rather than a unique identifier.
 *
 * @template TValue - The type of the wrapped value
 */
export abstract class ValueObject<TValue> {
  private readonly [VO_BRAND]: void;

  /**
   * The encapsulated value.
   * @protected
   */
  protected readonly _value: TValue;

  /**
   * Creates a new value object wrapping the given value.
   *
   * @param value - The value to wrap
   * @protected
   */
  protected constructor(value: TValue) {
    this._value = value;
  }

  /**
   * Gets the wrapped value.
   *
   * @returns The encapsulated value
   */
  public get value(): TValue {
    return this._value;
  }

  /**
   * Checks if this value object is equal to another value object.
   * Concrete implementations should define equality based on the values.
   *
   * @param other - The value object to compare with
   * @returns True if the value objects are equal, false otherwise
   */
  public abstract equals(other: this): boolean;

  /**
   * Returns a string representation of the value object.
   *
   * @returns A string representation of this value object
   */
  public abstract toString(): string;
}
