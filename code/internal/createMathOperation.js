import baseToNumber from './baseToNumber.js'
import baseToString from './baseToString.js'

/**
 * 传建一个函数来表示两个值的数学运算
 * 返回一个function，再给这个function传递具体的参与运算的值
 *
 * @private
 * @param {Function} operator 实际要进行的数学运算
 * @param {number} [defaultValue] 当两个数都未传递时，则返回defaultValue
 * @returns {Function} createMathOperation返回的是一个function
 */

function createMathOperation(operator, defaultValue) {
  return (value, other) => {
    // 当两个数都未传递时
    if (value === undefined && other === undefined) {
      return defaultValue
    }
    // 当第二个数未传递时
    if (value !== undefined && other === undefined) {
      return value
    }
    // 当第一个数未传递时
    if (other !== undefined && value === undefined) {
      return other
    }
    // 当传递的参数类型是字符串的时候，将两个值都转换成字符串
    if (typeof value == 'string' || typeof other == 'string') {
      value = baseToString(value)
      other = baseToString(other)
    }
    // 否则将两个值转成数字
    else {
      value = baseToNumber(value)
      other = baseToNumber(other)
    }
    return operator(value, other)
  }
}

export default createMathOperation
