一个生成支持Volar插件 vue GlobalComponents 文件的工具

```javascript
const vueComponentVolar = require('vue-component-volar');
vueComponentVolar({
	globs: './test/component/**/*.{vue,tsx,jsx}',
	output: './test/index.d.ts',
	prefixPath: './component',
    prefixName: 'm-',
	ignoreExt: ['tsx'],
	namingStyle: 'hyphen',
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	
})
```
