const toString = Object.prototype.toString

export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is undefined {
  return !isDef(val)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNil(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}


export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isArray(val: unknown): val is Array<unknown> {
  return val && Array.isArray(val)
}