declare const VO_BRAND: unique symbol;

export abstract class ValueObject<TValue> {
  private readonly [VO_BRAND]: void;

  protected readonly _value: TValue;

  protected constructor(value: TValue) {
    this._value = value;
  }

  public get value(): TValue {
    return this._value;
  }

  public abstract equals(other: this): boolean;

  public abstract toString(): string;
}
