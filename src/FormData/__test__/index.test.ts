import { FormDataPolyfill } from '..';

describe('FormDataPolyfill', () => {
  it('should append and get values correctly', () => {
    const formData = new FormDataPolyfill();

    formData.append('name', 'John');
    formData.append('age', '30');

    expect(formData.get('name')).toEqual({ value: 'John' });
    expect(formData.get('age')).toEqual({ value: '30' });
    expect(formData.get('invalid')).toBeNull();
  });

  it('should get all values for a given name', () => {
    const formData = new FormDataPolyfill();

    formData.append('color', 'red');
    formData.append('color', 'blue');
    formData.append('color', 'green');

    const allColors = formData.getAll('color');
    expect(allColors).toHaveLength(3);
    expect(allColors[0]).toEqual({ value: 'red' });
    expect(allColors[1]).toEqual({ value: 'blue' });
    expect(allColors[2]).toEqual({ value: 'green' });
  });

  it('should check if a name exists', () => {
    const formData = new FormDataPolyfill();

    formData.append('username', 'john_doe');
    formData.append('email', 'john@example.com');

    expect(formData.has('username')).toBe(true);
    expect(formData.has('email')).toBe(true);
    expect(formData.has('invalid')).toBe(false);
  });

  it('should set a value and delete a value', () => {
    const formData = new FormDataPolyfill();

    formData.append('language', 'JavaScript');
    expect(formData.get('language')).toEqual({ value: 'JavaScript' });

    formData.set('language', 'TypeScript');
    expect(formData.get('language')).toEqual({ value: 'TypeScript' });

    formData.delete('language');
    expect(formData.get('language')).toBeNull();
  });

  it('should iterate over entries, keys, and values', () => {
    const formData = new FormDataPolyfill();

    formData.append('fruit', 'apple');
    formData.append('fruit', 'banana');
    formData.append('drink', 'water');

    const entries = [...formData.entries()];
    expect(entries).toEqual([
      ['fruit', { value: 'apple' }],
      ['fruit', { value: 'banana' }],
      ['drink', { value: 'water' }]
    ]);

    const keys = [...formData.keys()];
    expect(keys).toEqual(['fruit', 'fruit', 'drink']);

    const values = [...formData.values()];
    expect(values).toEqual([{ value: 'apple' }, { value: 'banana' }, { value: 'water' }]);
  });

  it('should invoke forEach correctly', () => {
    const formData = new FormDataPolyfill();

    formData.append('animal', 'cat');
    formData.append('animal', 'dog');

    const result: { name: string; value: string }[] = [];
    formData.forEach((value, name) => {
      result.push({ name, value });
    });

    expect(result).toEqual([
      { name: 'animal', value: 'cat' },
      { name: 'animal', value: 'dog' }
    ]);
  });
});
