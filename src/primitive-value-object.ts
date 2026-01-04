import { ValueObject } from './value-object';

declare const PRIMITIVE_VO_BRAND: unique symbol;

export abstract class PrimitiveValueObject<
  T extends string | number | boolean,
> extends ValueObject<T> {
  private readonly [PRIMITIVE_VO_BRAND]: void;

  public equals(other: this): boolean {
    return this._value === other.value;
  }

  public toString(): string {
    return String(this._value);
  }
}
