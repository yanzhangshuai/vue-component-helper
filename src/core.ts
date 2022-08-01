import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import { OptionConfig, TabWidth } from './type'
import { isArray, isString, isNil } from './is'
import { tabWidthHandler, outputPathHandler, namingStyleHandler, pathHandler, pathPartHandler, quoteHandler, semiHandler } from './util'

function sync(globs: string, ignore?: string[]) {

	const globsPath = fg.sync(globs, { unique: true, onlyFiles: true, ignore: ignore, absolute: true })

	// 	根据globs 绝对路径获取除去前缀的路基
	const globsAbsolutePath = path.resolve(globs)

	const prefixPath = pathPartHandler(globsAbsolutePath.substring(0, globsAbsolutePath.indexOf('*')))

	const prefixPathRegExp = new RegExp(`^${prefixPath}(.*)$`)

	return globsPath.map((f) => f.match(prefixPathRegExp)?.[1]).filter((p) => !isNil(p))
}

export function globsPath(globs: string | string[], ignore?: string[]): string[] {
	const globsPath: string[] = []

	if (isString(globs)) {
		globsPath.push(...sync(globs, ignore))
	} else if (isArray(globs)) {
		globs.forEach((p) => globsPath.push(...sync(p, ignore)))
	}

	return globsPath
}

export function defaultComponentResolver(componentPath: string, option?: OptionConfig) : { name: string; path: string } {
	if (!isString(componentPath)) {
		throw new Error('componentPath is not a string')
	}

	const prefixName = option?.prefixName || ''
	const parsedPath = path.parse(componentPath)

	const componentName = parsedPath.name === 'index' ? parsedPath.dir.substring(parsedPath.dir.lastIndexOf('/') + 1) : parsedPath.name


	// 是否添加后缀
	const ext = !isArray(option.ignoreExt) || !option.ignoreExt.includes(parsedPath.ext.substring(1))

	const importPath = pathHandler(option.prefixPath || './') + path.join(parsedPath.dir, ext ? parsedPath.base : parsedPath.name)

	return { name: namingStyleHandler(prefixName + componentName, option?.namingStyle), path: importPath }

}


function formatComponents(components: { name: string; path: string}[], tabWidth?: TabWidth) {

	return components.filter((c) => c).map((c) => {
		const component = `'${c.name}': typeof import('${pathPartHandler(c.path)}')['default']`
		return tabWidthHandler((tabWidth || 4) * 2) + component +';\r\n'
	}).join('')
}

export function output(components: { name: string; path: string}[], options?: OptionConfig) {

	let text = 'declare module \'vue\' { \r\n'
	text += `${tabWidthHandler(options?.tabWidth)}export interface GlobalComponents { \r\n`
	text += formatComponents(components, options?.tabWidth)
	text += `${tabWidthHandler(options?.tabWidth)}}\r\n`
	text += '}\r\n'
	text += 'export {};'
	options.endOfLine && (text += '\r\n')

	fs.writeFileSync(outputPathHandler(options?.output || './'), semiHandler(quoteHandler(text, options.singleQuote), options.semi))
}
