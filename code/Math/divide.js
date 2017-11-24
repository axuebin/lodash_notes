import createMathOperation from './.internal/createMathOperation.js'

/**
 * 两个数相除
 *
 * @since 4.7.0
 * @category Math
 * @param {number} dividend 被除数
 * @param {number} divisor 除数
 * @returns {number} 返回相除的结果
 * @example
 *
 * divide(6, 4)
 * // => 1.5
 */
const divide = createMathOperation((dividend, divisor) => dividend / divisor, 1)

export default divide
