import isSymbol from '../Lang/isSymbol.js'

/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/**
 * toNumber 的实现
 *
 * @private
 * @param {*} value 要处理的值.
 * @returns {number} 返回一个数字类型的值
 */
function baseToNumber(value) {
  // 如果 typeof 判断是 number 就直接返回值
  if (typeof value == 'number') {
    return value
  }
  // 如果是 Symbol 类型 则返回 NAN
  if (isSymbol(value)) {
    return NAN
  }
  // 否则用 +value 的形式强转成数字类型
  return +value
}

export default baseToNumber
