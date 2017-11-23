import isSymbol from '../Lang/isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/** Used to convert symbols to primitives and strings. */
const symbolProto = Symbol ? Symbol.prototype : undefined
const symbolToString = symbolProto ? symbolProto.toString : undefined

/**
 * toString的实现
 *
 * @private
 * @param {*} value 要处理的值
 * @returns {string} 返回字符串
 */
function baseToString(value) {
  // 如果是string就直接返回
  if (typeof value == 'string') {
    return value
  }
  // 如果是数组，则递归数组的每一项，返回字符串
  if (Array.isArray(value)) {
    return `${value.map(baseToString)}`
  }
  // 如果是Symbol类型的，用toTring.call来转换
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  // 如果都不是，就直接用模板字符串的方式返回字符串吧
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default baseToString
