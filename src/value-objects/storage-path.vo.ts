import { PrimitiveValueObject } from '../primitive-value-object';

const STORAGE_PATH_VO_BRAND = Symbol('StoragePath');

/**
 * Value object representing a storage path with validation.
 * Ensures paths are safe and properly formatted for storage operations.
 * Paths must not start with '/', contain double slashes, or include '..' for security.
 *
 * @extends PrimitiveValueObject
 */
export class StoragePath extends PrimitiveValueObject<string> {
  private readonly [STORAGE_PATH_VO_BRAND]: void;

  /**
   * Private constructor to enforce factory method usage.
   *
   * @param value - The validated storage path string
   * @private
   */
  private constructor(value: string) {
    super(value);
  }

  /**
   * Factory method to create a new StoragePath with validation.
   *
   * @param value - The storage path string to validate and wrap
   * @returns A new StoragePath instance
   * @throws {Error} If path starts with '/'
   * @throws {Error} If path contains double slashes '//'
   * @throws {Error} If path contains '..' (parent directory reference)
   */
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

  /**
   * Converts the storage path to a full URL by combining with a base URL.
   * Ensures proper URL formatting by removing trailing slashes from base URL.
   *
   * @param baseUrl - The base URL to prepend to the storage path
   * @returns The complete URL with the storage path appended
   * @example
   * const path = StoragePath.create('files/document.pdf');
   * path.toUrl('https://storage.example.com'); // 'https://storage.example.com/files/document.pdf'
   */
  public toUrl(baseUrl: string): string {
    return `${baseUrl.replace(/\/$/, '')}/${this._value}`;
  }

  /**
   * Gets the file extension from the storage path.
   *
   * @returns The lowercase file extension without the dot, or empty string if no extension
   * @example
   * StoragePath.create('files/document.PDF').extension // 'pdf'
   * StoragePath.create('files/readme').extension // ''
   */
  public get extension(): string {
    const parts = this._value.split('.');
    return parts.at(-1)?.toLowerCase() ?? '';
  }
}
