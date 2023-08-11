const HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;

function normalizeHeaderName(name: string): string {
  if (typeof name !== 'string') {
    name = String(name);
  }

  if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === '') {
    throw new TypeError('Invalid character in header field name');
  }

  return name.toLowerCase();
}

function normalizeHeaderValue(value: string): string {
  if (typeof value !== 'string') {
    value = String(value);
  }

  return value;
}

const NORMALIZED_HEADERS: unique symbol = Symbol('normalizedHeaders');
const RAW_HEADER_NAMES: unique symbol = Symbol('rawHeaderNames');

export class HeadersPolyfill {
  private [NORMALIZED_HEADERS]: Record<string, string> = {};

  private [RAW_HEADER_NAMES]: Map<string, string> = new Map();

  constructor(init?: Record<string, string>) {
    if (init) {
      Object.getOwnPropertyNames(init).forEach(name => {
        this.append(name, init[name]);
      });
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  *keys(): IterableIterator<string> {
    for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
      yield name;
    }
  }

  *values(): IterableIterator<string> {
    for (const value of Object.values(this[NORMALIZED_HEADERS])) {
      yield value;
    }
  }

  *entries(): IterableIterator<[string, string]> {
    for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
      yield [name, this.get(name)!];
    }
  }

  get(name: string): string | null {
    return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] || null;
  }

  set(name: string, value: string): void {
    const normalizedName = normalizeHeaderName(name);
    this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(value);
    this[RAW_HEADER_NAMES].set(normalizedName, name);
  }

  append(name: string, value: string): void {
    const normalizedName = normalizeHeaderName(name);
    const resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value}` : value;

    this.set(name, resolvedValue);
  }

  delete(name: string): void {
    if (!this.has(name)) {
      return;
    }

    const normalizedName = normalizeHeaderName(name);
    delete this[NORMALIZED_HEADERS][normalizedName];
    this[RAW_HEADER_NAMES].delete(normalizedName);
  }

  all(): Record<string, string> {
    return this[NORMALIZED_HEADERS];
  }

  raw(): Record<string, string> {
    const rawHeaders: Record<string, string> = {};

    for (const [name, value] of this.entries()) {
      rawHeaders[this[RAW_HEADER_NAMES].get(name)!] = value;
    }

    return rawHeaders;
  }

  has(name: string): boolean {
    return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
  }

  forEach<ThisArg = this>(
    callback: (this: ThisArg, value: string, name: string, parent: this) => void,
    thisArg?: ThisArg
  ) {
    for (const name in this[NORMALIZED_HEADERS]) {
      if (this[NORMALIZED_HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg!, this[NORMALIZED_HEADERS][name], name, this);
      }
    }
  }
}
