import { PrimitiveValueObject } from '../primitive-value-object';

declare const STORAGE_PATH_VO_BRAND: unique symbol;

export class StoragePath extends PrimitiveValueObject<string> {
  private readonly [STORAGE_PATH_VO_BRAND]: void;

  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): StoragePath {
    if (value.startsWith('/')) {
      throw new Error('Storage path should not start with /');
    }
    if (value.includes('//')) {
      throw new Error('Storage path contains invalid double slashes');
    }
    if (value.includes('..')) {
      throw new Error('Storage path cannot contain ..');
    }

    return new StoragePath(value);
  }

  public toUrl(baseUrl: string): string {
    return `${baseUrl.replace(/\/$/, '')}/${this._value}`;
  }

  public get extension(): string {
    const parts = this._value.split('.');
    return parts.at(-1)?.toLowerCase() ?? '';
  }
}
