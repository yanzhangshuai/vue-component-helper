一个生成 vue GlobalComponents 文件的工具

```javascript
const vueComponentHelper = require('vue-component-helper');
vueComponentHelper({
  entry: './test/component/modules/**/*.{vue,tsx,jsx}',
  singleQuote: true,
  tabWidth: 2,
  prefixPath: '@/',
  outfile: './index.d.ts',
  semi: true,
})
```
