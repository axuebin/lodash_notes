import createRound from './.internal/createRound.js'

/**
 * 按照 precision 来向下舍入
 *
 * @since 3.10.0
 * @category Math
 * @param {number} number 需要舍入的数字
 * @param {number} [precision=0] 精度
 * @returns {number} 返回结果
 * @example
 *
 * floor(4.006)
 * // => 4
 *
 * floor(0.046, 2)
 * // => 0.04
 *
 * floor(4060, -2)
 * // => 4000
 */
const floor = createRound('floor')

export default floor
