import { URLSearchParamsPolyfill } from '..';

describe('URLSearchParamsPolyfill', () => {
  it('should parse string input correctly', () => {
    const params = new URLSearchParamsPolyfill('name=John&age=30');
    expect(params.get('name')).toBe('John');
    expect(params.get('age')).toBe('30');
  });

  it('should copy from another URLSearchParamsPolyfill correctly', () => {
    const sourceParams = new URLSearchParamsPolyfill();
    sourceParams.append('name', 'John');
    sourceParams.append('age', '30');

    const params = new URLSearchParamsPolyfill(sourceParams);
    expect(params.get('name')).toBe('John');
    expect(params.get('age')).toBe('30');
  });

  it('should create from array of key-value pairs correctly', () => {
    const input: [string, string][] = [
      ['name', 'John'],
      ['age', '30']
    ];

    const params = new URLSearchParamsPolyfill(input);
    expect(params.get('name')).toBe('John');
    expect(params.get('age')).toBe('30');
  });

  it('should create from record of key-value pairs correctly', () => {
    const input: Record<string, string> = {
      name: 'John',
      age: '30'
    };

    const params = new URLSearchParamsPolyfill(input);
    expect(params.get('name')).toBe('John');
    expect(params.get('age')).toBe('30');
  });

  it('should append and get values correctly', () => {
    const params = new URLSearchParamsPolyfill();
    params.append('name', 'John');
    params.append('name', 'Doe');
    params.append('age', '30');

    expect(params.get('name')).toBe('John');
    expect(params.getAll('name')).toEqual(['John', 'Doe']);
    expect(params.get('age')).toBe('30');
  });

  it('should delete values correctly', () => {
    const params = new URLSearchParamsPolyfill();
    params.append('name', 'John');
    params.append('age', '30');

    params.delete('name');
    expect(params.get('name')).toBeNull();
    expect(params.get('age')).toBe('30');
  });

  it('should check existence of values correctly', () => {
    const params = new URLSearchParamsPolyfill();
    params.append('name', 'John');

    expect(params.has('name')).toBeTruthy();
    expect(params.has('age')).toBeFalsy();
  });

  it('should iterate over keys and values correctly', () => {
    const params = new URLSearchParamsPolyfill();
    params.append('name', 'John');
    params.append('age', '30');

    const entries: [string, string][] = Array.from(params.entries());
    expect(entries).toEqual([
      ['name', 'John'],
      ['age', '30']
    ]);

    const keys: string[] = Array.from(params.keys());
    expect(keys).toEqual(['name', 'age']);

    const values: string[] = Array.from(params.values());
    expect(values).toEqual(['John', '30']);
  });

  it('should convert to string correctly', () => {
    const params = new URLSearchParamsPolyfill();
    params.append('name', 'John');
    params.append('age', '30');

    const paramString = params.toString();
    expect(paramString).toBe('name=John&age=30');
  });
});
