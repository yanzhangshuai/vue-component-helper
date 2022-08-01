import vueComponentVolar from '../lib/index'

vueComponentVolar({
	globs: './test/component/**/*.{vue,tsx,jsx}',
	singleQuote: true,
	ignoreExt: ['tsx'],
	namingStyle: 'hyphen',
	tabWidth: 2,
	prefixPath: './component',
	prefixName: 'm-',
	output: './test/index.d.ts',
	endOfLine: true,
	semi: true,
})
