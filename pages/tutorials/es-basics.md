---
layout: page
layout_type: sandwich

page_category: tutorial

title: ECMAScript 基础
description: 关于 ECMAScript 的一些基本知识
permalink: /es-basics/
comments: true
css:
  - highlight
---

**本文中凡是提到 ECMAScript 的地方，皆用「ES」来表示；literal 即叫「直接量」又叫「字面量」，文中统一为「直接量」。**

## 数据类型
{:.heading}

在 ES 中，数据类型被分为原始类型（primitive type）和对象类型（object type）两大类。数字（number）、字符串（string）、布尔（boolean）、空（null）和未定义（undefined）是原始类型；对象（object）、数组（array）和函数（function）则是对象类型。

对象类型的数据是属性（property）的集合，每个属性都是由键值（key/value）对组成。一般，对象是键值对的无序集合，但数组是一种特殊的有编号的有序集合。函数也是一种特殊的对象，它包含了与之相关联的可执行代码。

如果函数用来初始化一个新建的对象，即使用 `new` 运算符，则称之为「构造函数」（constructor）。每个构造函数定义了一类（class）对象——由构造函数初始化的对象组成的集合。「类」可以看作是对象类型的子类型。

数据类型之间的关系结构如下：

- 原始类型
  - 数字
  - 字符串
  - 布尔
  - 空
  - 未定义
- 对象类型
  - 对象
  - 数组
  - 函数
    - 普通函数
    - 构造函数（类）
      - 数组类（Array）
      - 函数类（Function）
      - 日期类（Date）
      - 正则表达式类（RegExp）
      - 错误类（Error）

### 数字

不区分整型和浮点型，采用根据 IEEE-754 标准定义的 64 位浮点格式表示数字。然而，实际的操作（比如数组索引以及位操作符）则是基于 32 位整数。

当一个数字直接出现在程序中时，被称为「数字直接量」（numeric literal），其表现形式将在下面列出。在任何数字直接量前面加上负号（`-`）能够得到其负值，但**负号是一元求反运算符，并不是数字直接量语法的组成部分。**

#### 整型直接量

- 十进制：`0` `3` `10000000`
- 十六进制：`0xff` `0xCAFE911`

#### 浮点型直接量

- 传统实数写法：`3.14` `.3333333333333`
- 指数记数法：`6.02e23` `1.4738223E-32`

### 字符串
