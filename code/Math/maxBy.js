import isSymbol from './isSymbol.js'

/**
 * 返回一个对象数组中按照某个条件最大的那个对象，若是普通数组，则返回最大值
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array 需要找到最大值的数组
 * @param {Function} iteratee 需要比较的那个元素
 * @returns {*} 返回最大值，可能是个具体的值、也可能是个对象
 * @example
 *
 * const objects = [{ 'n': 1 }, { 'n': 2 }]
 *
 * maxBy(objects, ({ n }) => n)
 * // => { 'n': 2 }
 */
function maxBy(array, iteratee) {
  let result
  if (array == null) {
    return result
  }
  for (const value of array) {
    let computed
    // 遍历数组，取出对象中需要进行比较的 value
    const current = iteratee(value)

    if (current != null && (computed === undefined
      ? (current === current && !isSymbol(current))
      : (current > computed))) {
      computed = current
      result = value
    }
  }
  return result
}

export default maxBy

// 举个栗子
console.log(maxBy([1, 2, 3])); // 3
console.log(maxBy(['a', 'b', 'c'])); // 'c'
console.log(maxBy([
  {
    a: 1,
    b: 2
  }, {
    a: 2,
    b: 1
  }
], ({a}) => a)); // {a: 2, b: 1}
console.log(maxBy([
  {
    a: 1,
    b: 2
  }, {
    a: 2,
    b: 1
  }
], ({b}) => b)); // {a: 1, b: 2}
