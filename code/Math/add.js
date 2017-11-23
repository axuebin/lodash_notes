import createMathOperation from '../.internal/createMathOperation.js'

/**
 * 两个值相加
 *
 * @since 3.4.0
 * @category Math
 * @param {number} augend 加法的第一个值.
 * @param {number} addend 加法的第二个值.
 * @returns {number} 返回两个数字的和.
 * @example
 *
 * add(6, 4)
 * // => 10
 */
const add = createMathOperation((augend, addend) => augend + addend, 0)

// 把一个加法运算传递给createMathOperation函数

export default add

// 举例
console.log(_.add(1+2)) // 3
console.log(_.add("1"+2)) // "12"
console.log(_.add("1"+"2")) // "12"
