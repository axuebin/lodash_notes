/**
 * sum 和 sumBy 的实现
 *
 * @private
 * @param {Array} array 需要计算的数组
 * @param {Function} iteratee 参与计算的那个数
 * @returns {number} 返回和
 */
function baseSum(array, iteratee) {
  let result

  for (const value of array) {
    // 遍历数组，取出对象中需要进行比较的 value
    const current = iteratee(value)
    if (current !== undefined) {
      result = result === undefined ? current : (result + current)
    }
  }
  return result
}

export default baseSum
