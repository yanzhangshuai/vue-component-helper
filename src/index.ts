import fg from 'fast-glob'
import { OptionConfig } from './type'
import { componentPathResolver, write } from './util'
//  匹配文件名称的正则

const COMPONENT_REGEX = /\/([\w\d-]+)([.-]component)?\/([\w\d-]+)([.-]component)?\.(vue|tsx|jsx)$/

export default function vueComponentHelper(options: OptionConfig) {
  const files: string[] = fg.sync(options.entry)
  
  const components = files.filter(file => COMPONENT_REGEX.test(file))
    .map(file => {
      const component = (options?.componentPathResolver ||
        componentPathResolver)(file, options)
      if (!component) return ''
      return component.endsWith(';') ? component : component + ';'
    })
    .join('')
  
  write(components, options)
}