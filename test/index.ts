import vueComponentHelper from '../lib/index'



vueComponentHelper({
  entry: './test/component/modules/**/*.{vue,tsx,jsx}',
  singleQuote: true,
  tabWidth: 2,
  prefixPath: '@/',
  outfile: './index.d.ts',
  semi: true,
})