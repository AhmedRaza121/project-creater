export class SafeJsonUtil {
  static parse(value: string, defaultValue: unknown[] | Record<string, unknown> | null) {
    try {
      return JSON.parse(value) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  static stringify<T>(value: T): string | null {
    try {
      return JSON.stringify(value) || null;
    } catch (e) {
      return null;
    }
  }
}
