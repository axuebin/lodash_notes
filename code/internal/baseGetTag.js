const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty
const toString = objectProto.toString
const symToStringTag = typeof Symbol != 'undefined' ? Symbol.toStringTag : undefined

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value 要查询的值
 * @returns {string} 返回 toStringTag
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  // 判断 value 中或者它的原型中有没有 toStringTag 属性
  // 许多内置的 JavaScript 对象类型没有 toStringTag 属性，但是能被 toString() 方法识别并返回特定的类型标签
  // 一些类似Map Set等类型，toString() 找不到 toStringTag 属性
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value)
  }
  // 判断 value 中有没有 toStringTag 属性，如果返回 false ，说明 value 原型中有 toStringTag 属性，但 value 中没有
  const isOwn = hasOwnProperty.call(value, symToStringTag)
  // 获取 value 中 toStringTag 属性对应的值，比如 value 是 new Map，则 tag 为 'Map'
  const tag = value[symToStringTag]
  let unmasked = false
  try {
    value[symToStringTag] = undefined
    unmasked = true
  } catch (e) {}

  const result = toString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}

export default baseGetTag
