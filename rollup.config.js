import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'


export default defineConfig({
  input: './src/index.ts',
  external: ['fast-glob', 'naming-style', 'tslib'],
  plugins: [
    typescript({
      tsconfig: './tsconfig-build.json',
    }),
  ],
  output: [
    {
      file: 'lib/index.es.js',
      format: 'es',
      exports: 'named',
    },
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'ComponentVolar',
      compact: true,
    },
  ],
})
