## 前言

最近有点咸鱼，读读 `lodash` 的源码吧，了解了解实现方法和思想，然后输出自己的想法，包括对源码的注释和笔记，笔记这部分主要是按照 [`lodash` 文档](https://lodash.com/docs/4.17.4) 的分类分为以下几篇：

- 阅读lodash源码——Math（一）
- 阅读lodash源码——Math（二）
- 阅读lodash源码——Math（三）

## 

[源码注释版](https://github.com/axuebin/lodash_notes/tree/master/code/Math)

这一组函数都是数学计算相关的，主要分为三类：

- 加减乘除：`add`、`subtract`、`multiply`、`divide`
- 求最大最小平均值：`max`、`maxBy`、`min`、`minBy`、`sum`、`sumBy`、`mean`、`meanBy`
- 小数的四舍五入：`ceil`、`floor`、`round`

## 加减乘除

在加减乘除的源码中可以看到这四个函数都引用了一个 `createMathOpeartion` 这个函数，然后是这样使用这个函数的：

```javascript
// 加法
const add = createMathOperation((augend, addend) => augend + addend, 0)
// 减法
const subtract = createMathOperation((minuend, subtrahend) => minuend - subtrahend, 0)
// 乘法
const multiply = createMathOperation((multiplier, multiplicand) => multiplier * multiplicand, 1)
// 除法
const divide = createMathOperation((dividend, divisor) => dividend / divisor, 1)
```

可以发现，它们的实现方式都是一样的，向 `createMathOperation` 传递一个函数，这个函数就是原生的加减乘除，所以主要的还是要看看 `createMathOperation` 是啥。

### createMathOperation

[源码注释版](https://github.com/axuebin/lodash_notes/blob/master/code/internal/createMathOperation.js)

```javascript
/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
```

从这个函数说明中可以看出，这个函数有两个参数：

- operator：原生四则运算函数
- defaultValue：默认值，当未传递参数时返回的（原生计算中一般返回 `NaN`）

我们拿 `add` 来举例。

```javascript
const add = createMathOperation((augend, addend) => augend + addend, 0)
const result = add(5, 3)
console.log(result) // 8
```

首先是通过 `createMathOperation` 创建一个 `add` 函数，然后向其传递参与计算的值，也就是说 `createMathOperation` 应该是返回一个函数，并且有两个参数。事实上就是这样，返回值是一个 `function(value, other)`，`value` 是被加数，`other` 是加数。

在进行加减乘除运算的时候，还需要考虑一点的就是参与计算的两个值的数据类型，是字符串还是数字？或者是 `undefined`？这里的实现方法满足以下几个规则：

1. 两个值都为 `undefined` 时，返回 `defaultValue`
2. 其中一个值为 `undefined` 时，返回另一个值
3. 有一个值为字符串时，用 `baseToString` 将两个值都转换成 `string` 进行计算
4. 其它情况，用 `baseToNumber` 将两个值都转换成 `number` 进行计算

#### undefined 和 null 在四则运算中的区别

我注意到代码中是判断 `value === undefined`，是 `===`，说明这里**严格区分 `undefined` 和 `null` **，这是之前没注意到的地方。这是为什么呢？

我拿原生的加减乘除做了个实验：

```javascript
console.log(1 + undefined) // NaN
console.log(1 + null) // 1
console.log(1 - undefined) // NaN
console.log(1 - null) // 1
console.log(1 * undefined) // NaN
console.log(1 * null) // 0
console.log(1 / undefined) // NaN
console.log(1 / null) // Infinity
```

`undefined` 参与计算的结果都是 `NaN`，`null` 参与计算是将它看作 `0`。

嗯，我们不一样，每个人都有不同的境遇 ~ 

But，why？为啥我们不一样？

我们知道 `undefined` 和 `null` 其中有一个区别是：

- undefined 是定义了但是没有赋值
- null 是为定义

如果按照这个区别，应该把 `undefined` 当作 `0` 啊，但是结果貌似不是这样，查查规范咯

![](http://omufjr5bv.bkt.clouddn.com/lodashMath1.png)

在这就看得比较清楚了，`ToNumber` 运算符会将 `undefined` 转换成 `NaN`，而将 `null` 转换成 `+0`。

#### baseToString

[源码注释版](https://github.com/axuebin/lodash_notes/blob/master/code/internal/baseToString.js)

```javascript
/**
 * The base implementation of `toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
```

规则：

1. 如果 `typeof` 返回 `string`，则直接返回 `value`
2. 如果是数组，则递归对数组中的每一项都执行 `baseToString`，直到不是数组为止，返回的是一个不含 `[]` 的字符串，相当于 `[].join('')` 的结果
3. 如果 `isSymbol` 判断为 `true`，则用 `toString.call` 来转换
4. 其它情况，就直接用模板字符串的方式返回字符串

对于 `isSymbol`，感觉还没理解到位，先不展开说了。。。