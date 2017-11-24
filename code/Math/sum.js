import baseSum from './.internal/baseSum.js'

/**
 * 计算数组所有数的和。
 *
 * @since 3.4.0
 * @category Math
 * @param {Array} array 需要计算的数组
 * @returns {number} 返回和
 * @example
 *
 * sum([4, 2, 8, 6])
 * // => 20
 */
function sum(array) {
  return (array != null && array.length)
    ? baseSum(array, (value) => value)
    : 0
}

export default sum
