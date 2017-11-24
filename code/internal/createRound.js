/**
 * 创建一个类似 round 的函数.
 *
 * @private
 * @param {string} methodName 传递一个舍入的规则
 * @returns {Function} 返回一个新的舍入方法
 */
function createRound(methodName) {
  const func = Math[methodName]
  return (number, precision) => {
    // 默认精度为 0，最大为 292
    precision = precision == null ? 0 : Math.min(precision, 292)
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      const value = func(`${pair[0]}e${+pair[1] + precision}`)

      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    }
    return func(number)
  }
}

export default createRound
