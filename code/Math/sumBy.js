import baseSum from './.internal/baseSum.js'

/**
 * 返回一个对象数组中对象的某个属性的值的和
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array 需要计算的数组
 * @param {Function} iteratee 返回数组中的某个属性的函数
 * @returns {number} Returns the sum.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * sumBy(objects, ({ n }) => n)
 * // => 20
 */
function sumBy(array, iteratee) {
  return (array != null && array.length)
    ? baseSum(array, iteratee)
    : 0
}

export default sumBy
