function get<R>(o: any, s: string): R | undefined {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o as R;
}

export class ObjectUtilsMock {
  static getValue<O, R>(object: O, path: string, defaultValue?: R): R {
    return get<R>(object, path) || (defaultValue ?? ({} as R));
  }
}
