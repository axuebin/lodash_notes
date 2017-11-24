import baseSum from './.internal/baseSum.js'

/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/**
 * 返回一个对象数组中对象的某个属性的值的平均值
 *
 * @since 4.7.0
 * @category Math
 * @param {Array} array 需要计算的数组
 * @param {Function} iteratee 需要计算的那个元素
 * @returns {number} 返回平均值
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * meanBy(objects, ({ n }) => n)
 * // => 5
 */
function meanBy(array, iteratee) {
  const length = array == null ? 0 : array.length
  return length ? (baseSum(array, iteratee) / length) : NAN
}

export default meanBy
