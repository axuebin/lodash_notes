import getTag from './.internal/getTag.js'

/**
 * 判断是否是Symbol类型.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 需要检查的值
 * @returns {boolean} 如果是一个Symbol类型则返回true
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
function isSymbol(value) {
  // 通过typeof获取value的类型
  const type = typeof value
  // 如果typeof返回symbol就直接返回true
  //
  return type == 'symbol' || (type == 'object' && value != null && getTag(value) == '[object Symbol]')
}

export default isSymbol

// 举个栗子
console.log(isSymbol(Symbol("axuebin"))); // true
console.log(isSymbol("axuebin")); // false
