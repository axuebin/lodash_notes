import baseGetTag from './baseGetTag.js'

/** `Object#toString` result references. */
const dataViewTag = '[object DataView]'
const mapTag = '[object Map]'
const objectTag = '[object Object]'
const promiseTag = '[object Promise]'
const setTag = '[object Set]'
const weakMapTag = '[object WeakMap]'

/** Used to detect maps, sets, and weakmaps. */
const dataViewCtorString = `${DataView}`
const mapCtorString = `${Map}`
const promiseCtorString = `${Promise}`
const setCtorString = `${Set}`
const weakMapCtorString = `${WeakMap}`

/**
 * 返回 value 的 toStringTag，也就是 '[object 类型]' 这个字符串
 *
 * @private
 * @param {*} value 要查询的值
 * @returns {string} 返回 value 的 toStringTag
 */
let getTag = baseGetTag

// 支持IE11中的data views，sets，maps 和 weak maps 以及 Node v6 以前的 promise 的识别
// 判断是否能用 baseGetTag 直接识别出来，如果不行，则自定义
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (getTag(new Map) != mapTag) ||
    (getTag(Promise.resolve()) != promiseTag) ||
    (getTag(new Set) != setTag) ||
    (getTag(new WeakMap) != weakMapTag)) {
  getTag = (value) => {
    const result = baseGetTag(value)
    // 判断是否是 Object
    const Ctor = result == objectTag ? value.constructor : undefined
    const ctorString = Ctor ? `${Ctor}` : ''

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag
        case mapCtorString: return mapTag
        case promiseCtorString: return promiseTag
        case setCtorString: return setTag
        case weakMapCtorString: return weakMapTag
      }
    }
    return result
  }
}

export default getTag

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
// Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，
// 这个字符串用来表示该对象的自定义类型标签，
// 通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。
// Object.prototype.toString.call('foo');     // "[object String]"
