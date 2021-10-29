import { pascal, hyphen } from 'naming-style'
import { NamingStyle } from './type'

/**
 * 转换命名规范
 * @param text 
 * @param style 
 * @returns 
 */
export function namingStyleHandler(text: string, style?: NamingStyle): string {
	if(style === 'hyphen') {
		return hyphen(text)
	}

	return pascal(text)
}

export function pathHandler(path: string): string {
	return	path?.endsWith('/') ? path : (path || '') + '/' 
}

export function pathPartHandler(path: string): string {
	return path.replace(/\\/g, '/')
}

/**
 * 处理单双引号
 */
export function quoteHandler(text: string, singleQuote?: boolean) {
	return singleQuote === false ? text.replace(/'/g, '"') : text.replace(/"/g, '\'')
}


export function semiHandler(text: string, semi?: boolean) {
	return semi === true ? text : text.replace(/;/g, '')
}

export function tabWidthHandler(tabWidth?: number) {
	const width = tabWidth || 4
	return new Array(width).fill(' ').join('')
}

export function outputPathHandler(output?: string) {
	if (/^(.*\/)+[\w.-]+.d.ts/.test(output)) {
		return output
	}

	if (/^[\w.-]+.d.ts/.test(output)) {
		return './' + output
	}

	if (!output.endsWith('.d.ts')) {
		return pathHandler(output) + 'index.d.ts'
	}

	return output
}
