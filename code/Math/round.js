import createRound from './.internal/createRound.js'

/**
 * 按照精度四舍五入
 *
 * @since 3.10.0
 * @category Math
 * @param {number} number 需要舍入的数
 * @param {number} [precision=0] 精度
 * @returns {number} 返回舍入的结果
 * @example
 *
 * round(4.006)
 * // => 4
 *
 * round(4.006, 2)
 * // => 4.01
 *
 * round(4060, -2)
 * // => 4100
 */
const round = createRound('round')

export default round
