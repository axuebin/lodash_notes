import baseMean from './meanBy.js'

/**
 * 计算数组中所有数的平均值
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array 需要计算的数组
 * @returns {number} 返回平均值
 * @example
 *
 * mean([4, 2, 8, 6])
 * // => 5
 */
function mean(array) {
  return baseMean(array, (value) => value)
}

export default mean
