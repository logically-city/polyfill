import { AbortControllerPolyfill, AbortSignalPolyfill } from '..';

describe('AbortControllerPolyfill', () => {
  it('should create AbortControllerPolyfill', () => {
    const controller = new AbortControllerPolyfill();
    expect(controller.signal).toBeInstanceOf(AbortSignalPolyfill);
  });

  it('should abort signal and trigger abort event', () => {
    const controller = new AbortControllerPolyfill();
    const signal = controller.signal;

    let aborted = false;
    signal.addEventListener('abort', () => {
      aborted = true;
    });

    controller.abort();
    expect(signal.aborted).toBe(true);
    expect(aborted).toBe(true);
  });

  it('should not trigger abort event after being aborted', () => {
    const controller = new AbortControllerPolyfill();
    const signal = controller.signal;

    let aborted = false;
    signal.addEventListener('abort', () => {
      aborted = true;
    });

    controller.abort();
    signal.dispatchEvent('abort');

    expect(signal.aborted).toBe(true);
    expect(aborted).toBe(true);
  });

  it('should not trigger abort event before being aborted', () => {
    const controller = new AbortControllerPolyfill();
    const signal = controller.signal;

    let aborted = false;
    signal.addEventListener('abort', () => {
      aborted = true;
    });

    signal.dispatchEvent('abort');

    expect(signal.aborted).toBe(false);
    expect(aborted).toBe(true);
  });
});
