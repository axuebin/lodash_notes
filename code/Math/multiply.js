import createMathOperation from './.internal/createMathOperation.js'

/**
 * 两个数相乘
 *
 * @since 4.7.0
 * @category Math
 * @param {number} multiplier 被乘数
 * @param {number} multiplicand 乘数
 * @returns {number} 返回相乘的结果
 * @example
 *
 * multiply(6, 4)
 * // => 24
 */
const multiply = createMathOperation((multiplier, multiplicand) => multiplier * multiplicand, 1)

export default multiply
