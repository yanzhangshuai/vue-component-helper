import { defineConfig } from 'rollup'
import ts from '@rollup/plugin-typescript'


export default defineConfig({
  input: './src/index.ts',
  external: ['fast-glob'],
  plugins: [
    ts({
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
      exports: 'named',
      name: 'ComponentsHelper',
      compact: true,
    },
  ],
})
