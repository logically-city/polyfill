import { EventCentre } from '@logically/coding-model';

export class AbortSignalPolyfill {
  static abort(reason?: any): AbortSignalPolyfill {
    const signal = new AbortSignalPolyfill();
    signal.aborted = true;
    signal.reason = reason;
    signal.dispatchEvent('abort');
    return signal;
  }

  static timeout(milliseconds: number): AbortSignalPolyfill {
    const signal = new AbortSignalPolyfill();
    setTimeout(() => {
      signal.aborted = true;
      signal.dispatchEvent('abort');
    }, milliseconds);
    return signal;
  }

  aborted = false;
  reason: any = undefined;
  onabort: null | ((this: AbortSignalPolyfill) => any) = null;

  private event = new EventCentre<{ abort: any }>();

  throwIfAborted() {
    if (this.aborted) {
      throw new Error(this.reason);
    }
  }

  addEventListener(type: 'abort', listener: () => void) {
    this.event.on(type, listener);
  }

  removeEventListener(type: 'abort', listener: () => void) {
    this.event.remove(type, listener);
  }

  dispatchEvent(type: 'abort') {
    this.event.emit(type);
  }
}

export class AbortControllerPolyfill {
  readonly signal: AbortSignalPolyfill;

  constructor() {
    this.signal = new AbortSignalPolyfill();
  }

  abort(reason?: any) {
    this.signal.aborted = true;
    this.signal.reason = reason;
    this.signal.dispatchEvent('abort');
  }
}
