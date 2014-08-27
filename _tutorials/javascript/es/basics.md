---
title: ECMAScript 基础
description: 关于 ECMAScript 的一些基本知识
css:
  - highlight
---

## 数据类型
{:.heading}

ES 中定义了 6 种数据类型：

- 数字（number）
- 字符串（string）
- 布尔（boolean）
- null
- undefined
- 对象（object）

其中，数字、字符串、布尔、null 和 undefined 等 5 种是原始类型（primitive type）。

对象是属性（property）的集合，每个属性都是由键值对（key/value）组成。一般，对象是键值对的无序集合，但数组是一种特殊的有编号的有序集合。函数也是一种特殊的对象，它包含了与之相关联的可执行代码。

如果函数用来初始化一个新建的对象，即使用 `new` 运算符，则称之为「构造函数」（constructor）。每个构造函数定义了一类（class）对象——由构造函数初始化的对象组成的集合。「类」可以看作是对象类型的子类型。

### 数字

不区分整型和浮点型，采用根据 IEEE-754 标准定义的 64 位浮点格式表示数字。然而，实际的操作（比如数组索引以及位操作符）则是基于 32 位整数。

当一个数字直接出现在程序中时，被称为「数字直接量」（numeric literal），其表现形式将在下面列出。在任何数字直接量前面加上负号（`-`）能够得到其负值，但**负号是一元求反运算符，并不是数字直接量语法的组成部分。**

#### 整型直接量

- 十进制
  - `0`
  - `3`
  - `10000000`
- 十六进制
  - `0xff`
  - `0xCAFE911`

#### 浮点型直接量

- 传统实数写法
  - `3.14`
  - `.3333333333333`
- 指数记数法
  - `6.02e23`
  - `1.4738223E-32`

### 字符串

字符串是一组由无符号的 16 位值组成的不可变的有序序列，每个字符通常来自于 Unicode 字符集。ES 采用的是 UTF-16 编码的 Unicode 字符集。

### 包装对象

字符串有属性是因为在引用属性时，ES 会将字符串的值通过调用 `new String()` 的方式转换为对象，一旦属性引用结束对象就会销毁（实现上未必会真的创建或销毁临时对象，但看起来如此）。 

同理，数字、布尔值等原始类型也具有各自创建临时对象的方法：`new Number()` 和 `new Boolean()`。原始类型在引用属性时所创建的临时对象称为「包装对象」。然而，`null` 和 `undefined` 没有包装对象，访问它们的属性会抛出 `TypeError`。

{% highlight js %}
var s = "test";
s.len = 4;
var t = s.len;
{% endhighlight %}

上面代码中变量 `t` 的值为 `undefined`——在对 `s.len` 赋值时创建了一个临时对象，但是语句执行之后那个临时对象销毁了，所以这条语句无效。再一次调用 `s.len` 时是创建的另一个临时对象，故 `t` 的值为 `undefined`。

### 变量比较

原始类型的比较是值的比较；对象为引用类型，值都是引用，比较时是看它们是否引用了同一个基对象。

将对象赋值给一个变量，仅仅是赋值的引用值，对象本身并没有复制一次。

### 类型转换

ES 运算符和语句期望使用多样化的数据类型，并可以相互转换。if 语句将判断条件转换为布尔值，但 `==` 运算符从不试图将其操作数转换为布尔值。

值 | 字符串 | 数字 | 布尔值 | 对象
---|--------|------|--------|-----
`undefined` | `"undefined"` | `NaN` | `false` | throws TypeError
`null` | `"null"` | `0` | `false` | throws TypeError
`true` | `"true"` | `1` |  | `new Boolean(true)`
`false` | `"false"` | `0` |  | `new Boolean(false)`
`""` |  | `0` | `false` | `new String("")`
`"1.2`" |  | `1.2` | `true` | `new String("1.2")`
`"one"` |  | `NaN` | `true` | `new String("one")`
`0` | `"0"` |  | `false` | `new Number(0)`
`-0` | `"0"` |  | `false` | `new Number(-0)`
`NaN` | `"NaN"` |  | `false` | `new Number(NaN)`
`Infinity` | `"Infinity"` |  | `true` | `new Number(Infinity)`
`-Infinity` | `"-Infinity"` |  | `true` | `new Number(-Infinity)`
`1` | `"1"` |  | `true` | `new Number(1)`
`{}` |  |  | `true` |
`[]` | `""` | `0` | `true` |
`[9]` | `"9"` | `9` | `true` |
`["a", "b"]` | `"a,b"` | `NaN` | `true` |
`function() {}` | | `NaN` | `true` |
