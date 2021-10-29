import { OptionConfig } from './type'
import { defaultComponentResolver, globsPath, output } from './core'
import { isNil } from './is'
//  匹配文件名称的正则

export default function vueComponentVolar(options: OptionConfig) {

  if(isNil(options)){
    throw new Error('vueComponentVolar options is undefined')
  }

  const globalPath: string[] = globsPath(options.globs, options.ignore)
  
  const components = globalPath.map(gp => (options?.componentResolver || defaultComponentResolver)(gp, options))
  
  output(components, options)
}