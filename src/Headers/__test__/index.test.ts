import { HeadersPolyfill } from '..';

describe('HeadersPolyfill', () => {
  let headers: HeadersPolyfill;

  beforeEach(() => {
    headers = new HeadersPolyfill();
  });

  it('should set and get header', () => {
    headers.set('Content-Type', 'application/json');
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('should append and get appended header', () => {
    headers.append('Accept', 'application/json');
    headers.append('Accept', 'text/plain');
    expect(headers.get('Accept')).toBe('application/json, text/plain');
  });

  it('should delete header', () => {
    headers.set('Authorization', 'Bearer token');
    headers.delete('Authorization');
    expect(headers.get('Authorization')).toBeNull();
  });

  it('should return true for existing header', () => {
    headers.set('Cache-Control', 'no-cache');
    expect(headers.has('Cache-Control')).toBe(true);
  });

  it('should return false for non-existing header', () => {
    expect(headers.has('Authorization')).toBe(false);
  });

  it('should iterate through headers', () => {
    headers.set('X-Header1', 'Value1');
    headers.set('X-Header2', 'Value2');

    const result: [string, string][] = [];
    headers.forEach((value, name) => {
      result.push([name, value]);
    });

    expect(result).toEqual([
      ['x-header1', 'Value1'],
      ['x-header2', 'Value2']
    ]);
  });

  it('should return all headers', () => {
    headers.set('X-Header1', 'Value1');
    headers.set('X-Header2', 'Value2');

    expect(headers.all()).toEqual({
      'x-header1': 'Value1',
      'x-header2': 'Value2'
    });
  });

  it('should return raw headers', () => {
    headers.set('X-Header1', 'Value1');
    headers.set('X-Header2', 'Value2');

    expect(headers.raw()).toEqual({
      'X-Header1': 'Value1',
      'X-Header2': 'Value2'
    });
  });
});
