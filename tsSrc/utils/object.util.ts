import { get } from 'lodash';
import { SafeJsonUtil } from './safe-json.util';

export class ObjectUtil {
  static getValue<O, R>(object: O, path: string, defaultValue?: R): R {
    return get(object, path, defaultValue) as R;
  }
  static toArray(object: any): any {
    return Object.values(object);
  }

  static stringifyValues<T>(object: Record<string, T>) {
    const stringifyObject: Record<string, T | string | null> = {};

    for (const key in object) {
      if (typeof object[key] === 'object') {
        stringifyObject[key] = SafeJsonUtil.stringify<T>(object[key]);
        continue;
      }
      stringifyObject[key] = object[key];
    }

    return stringifyObject;
  }
}
