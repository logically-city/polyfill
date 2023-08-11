import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: ['@logically/coding-model'],
  globals: { '@logically/coding-model': 'logicallyCodingModel' },
  terser: false,
  style: false,
  input: 'src/index.ts'
});
