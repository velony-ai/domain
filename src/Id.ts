import { PrimitiveValueObject } from './primitive-value-object.js';

declare const ID_BRAND: unique symbol;

export abstract class Id<
  T extends string | number,
> extends PrimitiveValueObject<T> {
  private readonly [ID_BRAND]: void;
}
