export class FormDataPolyfill<T = string> {
  private _entries: [string, { value: T; fileName?: string }][] = [];

  append(name: string, value: T, fileName?: string): void {
    this._entries.push([name, { value, fileName }]);
  }

  delete(name: string): void {
    const index = this._entries.findIndex(entry => entry[0] === name);
    if (index !== -1) {
      this._entries.splice(index, 1);
    }
  }

  get(name: string) {
    const entry = this._entries.find(entry => entry[0] === name);
    return entry ? entry[1] : null;
  }

  getAll(name: string) {
    return this._entries.filter(entry => entry[0] === name).map(entry => entry[1]);
  }

  has(name: string) {
    return this._entries.some(entry => entry[0] === name);
  }

  set(name: string, value: T, fileName?: string) {
    this.delete(name);
    this.append(name, value, fileName);
  }

  forEach(callback: (value: T, name: string, formData: ThisType<FormDataPolyfill<T>>) => void): void {
    this._entries.forEach(entry => {
      callback(entry[1].value, entry[0], this);
    });
  }

  entries() {
    return this._entries[Symbol.iterator]();
  }

  keys(): IterableIterator<string> {
    return this._entries.map(entry => entry[0])[Symbol.iterator]();
  }

  values() {
    return this._entries.map(entry => entry[1])[Symbol.iterator]();
  }
}
