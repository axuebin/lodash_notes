import createMathOperation from './.internal/createMathOperation.js'

/**
 * 两个数相减
 *
 * @since 4.0.0
 * @category Math
 * @param {number} minuend 被减数
 * @param {number} subtrahend 减数
 * @returns {number} 返回相减的结果
 * @example
 *
 * subtract(6, 4)
 * // => 2
 */
const subtract = createMathOperation((minuend, subtrahend) => minuend - subtrahend, 0)

export default subtract
