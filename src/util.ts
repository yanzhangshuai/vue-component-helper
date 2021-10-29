import fs from 'fs'
import { OptionConfig } from './type'

const COMPONENT_REGEX = /\/([\w\d-]+)([.-]component)?\/([\w\d-]+)([.-]component)?\.(vue|tsx|jsx)$/

const COMMON_PATH_REGEX = /(?<=[^*/]*\/|)((?:[^*/]+\/)+)/

function quoteHandler(text: string, singleQuote?: boolean) {
  return singleQuote === false ? text.replace(/'/g, '"') : text.replace(/"/g,
    '\'')
  
}

function childPathHandler(text: string) {
  return text?.endsWith('/') ? text : (text || '') + '/'
}

function semiHandler(text: string, semi?: boolean) {
  return semi === false ? text.replace(/;/g, '') : text
}

function generateTabWidth(tabWidth?: number) {
  const width = tabWidth || 4
  return new Array(width).fill(' ').join('')
}

function generateWritePath(oudir?: string, outfile?: string) {
  if (/^.*\/\w+.d.ts$/.test(outfile)) {
    return outfile
  }
  if (/^\w+.d.ts$/.test(outfile)) {
    return childPathHandler((oudir || '/')) + outfile
  }
  return childPathHandler((oudir || '/')) + 'index.d.ts'
}

export function write(components: string, options?: OptionConfig) {
  
  const formatComponents = () => {
    return components.split(';')
      .filter(c => c)
      .map(component => {
        return generateTabWidth((options?.tabWidth || 4) * 2) + component +
          ';\r\n'
      })
      .join('')
  }
  let text = 'declare module \'vue\' { \r\n'
  text += `${ generateTabWidth(
    options?.tabWidth) }export interface GlobalComponents { \r\n`
  text += formatComponents()
  text += `${ generateTabWidth(options?.tabWidth) } }\r\n`
  text += '}\r\n'
  text += 'export {};'
  
  text = semiHandler(quoteHandler(text, options.singleQuote), options.semi)
  
  fs.writeFileSync(generateWritePath(options?.outdir, options?.outfile), text)
}

export function componentPathResolver(path: string, options?: OptionConfig) {
  
  const fileMatch = path.match(COMPONENT_REGEX)
  
  const componentName = (fileMatch?.[3] && fileMatch?.[3] !== 'index'
    ? fileMatch?.[3]
    : fileMatch?.[1])
  if (!componentName) return ''
  
  const commonPath = options.entry.match(COMMON_PATH_REGEX)?.[1] || ''
  
  const prefixPath = options?.prefixPath || ''
  
  const importPath = `${ childPathHandler(prefixPath) }${ path.substr(
    path.indexOf(commonPath) + commonPath.length) }`
  
  return `'${ componentName }': typeof import('${ importPath }')['default'];`
}