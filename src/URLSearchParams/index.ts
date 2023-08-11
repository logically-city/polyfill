export class URLSearchParamsPolyfill {
  private params: Record<string, string[]> = {};

  constructor(input?: string | URLSearchParamsPolyfill | Record<string, string> | [string, string][]) {
    if (input) {
      if (typeof input === 'string') {
        this.parse(input);
      } else if (input instanceof URLSearchParamsPolyfill) {
        this.copyFrom(input);
      } else if (Array.isArray(input)) {
        this.fromArray(input);
      } else if (typeof input === 'object') {
        this.fromRecord(input);
      }
    }
  }

  append(name: string, value: string): void {
    if (!this.params[name]) {
      this.params[name] = [];
    }
    this.params[name].push(value);
  }

  delete(name: string): void {
    delete this.params[name];
  }

  entries(): IterableIterator<[string, string]> {
    return this.keysAndValues();
  }

  get(name: string): string | null {
    const values = this.params[name];
    return values ? values[0] : null;
  }

  getAll(name: string): string[] {
    return this.params[name] || [];
  }

  has(name: string): boolean {
    return name in this.params;
  }

  keys(): IterableIterator<string> {
    return Object.keys(this.params)[Symbol.iterator]();
  }

  set(name: string, value: string): void {
    this.params[name] = [value];
  }

  sort(): void {
    const sorted: Record<string, string[]> = {};
    Object.keys(this.params)
      .sort()
      .forEach(key => {
        sorted[key] = this.params[key];
      });
    this.params = sorted;
  }

  toString(): string {
    return Array.from(this.keysAndValues())
      .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  values(): IterableIterator<string> {
    return Array.from(this.keysAndValues())
      .map(([_, value]) => value)
      [Symbol.iterator]();
  }

  private *keysAndValues(): IterableIterator<[string, string]> {
    for (const name in this.params) {
      if (this.params.hasOwnProperty(name)) {
        for (const value of this.params[name]) {
          yield [name, value];
        }
      }
    }
  }

  private parse(input: string): void {
    input = input.replace(/^\?/, '');
    const pairs = input.split('&');
    pairs.forEach(pair => {
      const [name, value] = pair.split('=').map(decodeURIComponent);
      this.append(name, value);
    });
  }

  private copyFrom(params: URLSearchParamsPolyfill): void {
    for (const [name, value] of params.entries()) {
      this.append(name, value);
    }
  }

  private fromArray(input: [string, string][]): void {
    input.forEach(([name, value]) => this.append(name, value));
  }

  private fromRecord(input: Record<string, string>): void {
    for (const name in input) {
      if (input.hasOwnProperty(name)) {
        this.append(name, input[name]);
      }
    }
  }
}
