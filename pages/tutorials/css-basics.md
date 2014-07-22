---
layout: page
layout_type: sandwich

page_category: tutorial

title: 层叠样式表基础
description: 关于层叠样式表的一些基本知识
permalink: /css-basics/
comments: true
css:
  - highlight
---

## CSS Levels
{:.heading}

CSS 中不存在传统意义中的「版本」（version），取而代之的是「级别」（level）。每个级别的 CSS 都建立在前一个级别之上，提炼精度并添加新特性。每个高级别的特性集都是低级别的超集。

### CSS Level 1 (CSS 1)

发布于 1996 年 12 月 17 日，是成为 W3C 官方推荐标准的第一个 CSS 规范，这要归功于作为原创开发者的哈坤·利（Håkon Wium Lie）和伯特·波斯（Bert Bos）。它支持了以下功能——

* 字形特性如字体和强调
* 文本、背景与其他元素的颜色
* 文本属性如字词间距、字母和文本行
* 文本、图像、表格与其他元素的对齐方式
* 大部分元素的边距、边框、补白和定位
* `id`和`class`属性

W3C 已不再对 CSS 1 标准进行维护。
{:.note}

### CSS Level 2 (CSS 2)

由 W3C 开发并于 1998 年 5 月发布为推荐标准。作为 CSS 1 的超集，引入了很多新特性，像元素的绝对定位、相对定位和固定定位以及层叠顺序，媒体类型的概念，对听觉样式表、双向文本及新的字形特性（如，阴影）的支持等。

W3C 已不再对 CSS 2 标准进行维护。
{:.note}

### CSS Level 2 Revision 1 (CSS 2.1)

修复一些 CSS 2 中的错误，移除支持不是很好或者不完全可互操作的特性，添加已经实现了的浏览器扩展。

### CSS Level 3 (CSS 3)

不再是一个庞大的定义很多特性的单独的规范，而是被分割成一些叫做「模块」（module）的文档。每个模块各自添加新功能或扩展在 CSS 2 中定义的特性，保持向后兼容。关于 CSS 3 的工作在发表 CSS 2 标准时就开始了。最早的 CSS 3 草案发表于 1999 年 6 月。

由于模块化，不同的模块拥有不同的稳定性和状态。截至 2012 年 6 月，CSS 工作组已经发布了超过 50 个 CSS 模块，其中四个已经成为推荐标准：

* [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/){:target="_blank"}{:rel="nofollow external"}（<time datetime="2011-06-07">2011 年 6 月 7 日</time>）
* [Selectors Level 3](http://www.w3.org/TR/selectors/){:target="_blank"}{:rel="nofollow external"}（<time datetime="2011-09-29">2011 年 9 月 29 日</time>）
* [CSS Namespaces Module Level 3](http://www.w3.org/TR/css3-namespace/){:target="_blank"}{:rel="nofollow external"}（<time datetime="2011-09-29">2011 年 9 月 29 日</time>）
* [Media Queries](http://www.w3.org/TR/css3-mediaqueries/){:target="_blank"}{:rel="nofollow external"}（<time datetime="2012-06-19">2012 年 6 月 19 日</time>）

## 定义
{:.heading}

<dl>
  <dt>样式表（Style sheet）</dt>
  <dd>
    <p>一个指定文档表现形式的声明的集合。</p>
    <p>样式表可以有三种不同的来源：作者、用户和用户代理。</p>
  </dd>
  <dt>有效的样式表（Valid style sheet）</dt>
  <dd>
    <p>样式表的合法性取决于它所采用的 CSS 级别。虽然所有有效的 CSS 1 样式表是有效的 CSS 2.1 样式表，但是有些来自于 CSS 1 的变更意味着一些 CSS 1 样式表在语义上会与 CSS 2.1 略微不同。有些 CSS 2 的特性没有包含在 CSS 2.1 当中，所以不是所有的 CSS 2 样式表都会在 CSS 2.1 样式表中有效。</p>
    <p>一个有效的 CSS 2.1 样式表必定是根据 CSS 2.1 的语法所写。另外，必须只能包含本规范中定义的 @ 规则、属性名和属性值。一个非法的 @ 规则、属性名或属性值是无效的。</p>
  </dd>
  <dt>源文件（Source document）</dt>
  <dd>
    <p>样式表所作用的文件。它在一些语言中会被编码，以使文档表现为元素树。每个元素包含一个用于识别元素类型的名称，可以是一些属性和一个（也许是空的）内容。例如，源文件可以是一个 XML 或 SGML 实例。</p>
  </dd>
  <dt>文档语言（Document language）</dt>
  <dd>
    <p>源文件的编码语言，如 HTML、XHTML、SVG 等。CSS 是用来描述文档语言的表现形式，不会改变文档语言的基本语义。</p>
  </dd>
  <dt>元素（Element）</dt>
  <dd>
    <p>文档语言的主要语法结构。大多 CSS 样式表规则使用这些元素的名称（例如 HTML 中的 P、TABLE、OL 等）去指定元素如何被渲染。</p>
  </dd>
  <dt>替换元素（Replaced element）</dt>
  <dd>
    <p>其内容在 CSS 格式模型（formatting model）范围之外的元素，如图像、内嵌文档或小程序。举个例子，HTML 中 IMG 元素的内容通常是被`src`属性所指定的图像所替换。替换元素通常会有固有尺寸：固有的宽度、固有的高度以及固有的比例。例如，位图图像具有由绝对单位（从内在的比例可以明显地确定）指定的固有宽度和高度。另一方面，其他文档可能没有任何固有尺寸（例如，一个空白的 HTML 文档）。</p>
    <p>User agents may consider a replaced element to not have any intrinsic dimensions if it is believed that those dimensions could leak sensitive information to a third party. For example, if an HTML document changed intrinsic size depending on the user's bank balance, then the UA might want to act as if that resource had no intrinsic dimensions.</p>
    <p>在 CSS 渲染模型中替换元素的内容不被考虑。</p>
  </dd>
  <dt>固有尺寸（Intrinsic dimensions）</dt>
  <dd>
    <p>The width and height as defined by the element itself, not imposed by the surroundings. CSS does not define how the intrinsic dimensions are found. In CSS 2.1 only replaced elements can come with intrinsic dimensions. For raster images without reliable resolution information, a size of 1 px unit per image source pixel must be assumed.</p>
  </dd>
  <dt>属性（Attribute）</dt>
  <dd>
    <p>与元素相关联，由名称和相应的（文本）值所组成的值。</p>
  </dd>
  <dt>内容（Content）</dt>
  <dd>
    <p>在源文件中内容与元素相关联。有些元素没有内容，这种情况下它们被称作“空元素”。一个元素的内容可以是文本，也可以是许多子元素，这时该元素被称为那些子元素的“父元素”。</p>
  </dd>
  <dt>（Ignore）</dt>
  <dd>
    <p>This term has two slightly different meanings in this specification. First, a CSS parser must follow certain rules when it discovers unknown or illegal syntax in a style sheet. The parser must then ignore certain parts of the style sheets. The exact rules for which parts must be ignored are described in these sections (Declarations and properties, Rules for handling parsing errors, Unsupported Values) or may be explained in the text where the term "ignore" appears. Second, a user agent may (and, in some cases must) disregard certain properties or values in the style sheet, even if the syntax is legal. For example, table-column elements cannot affect the font of the column, so the font properties must be ignored.</p>
  </dd>
  <dt>（Rendered content）</dt>
  <dd>
    <p>The content of an element after the rendering that applies to it according to the relevant style sheets has been applied. How a replaced element's content is rendered is not defined by this specification. Rendered content may also be alternate text for an element (e.g., the value of the XHTML "alt" attribute), and may include items inserted implicitly or explicitly by the style sheet, such as bullets, numbering, etc.</p>
  </dd>
  <dt>文档树（Document tree）</dt>
  <dd>The tree of elements encoded in the source document. Each element in this tree has exactly one parent, with the exception of the root element, which has none.</dd>
  <dt>子（Child）</dt>
  <dd>
    <p>An element A is called the child of element B if and only if B is the parent of A.</p>
  </dd>
  <dt>后代（Descendant）</dt>
  <dd>
    <p>An element A is called a descendant of an element B, if either (1) A is a child of B, or (2) A is the child of some element C that is a descendant of B.</p>
  </dd>
  <dt>祖先（Ancestor）</dt>
  <dd>
    <p>An element A is called an ancestor of an element B, if and only if B is a descendant of A.</p>
  </dd>
  <dt>兄弟（Sibling）</dt>
  <dd>
    <p>An element A is called a sibling of an element B, if and only if B and A share the same parent element. Element A is a preceding sibling if it comes before B in the document tree. Element B is a following sibling if it comes after A in the document tree.</p>
  </dd>
  <dt>（Preceding element）</dt>
  <dd>
    <p>An element A is called a preceding element of an element B, if and only if (1) A is an ancestor of B or (2) A is a preceding sibling of B.</p>
  </dd>
  <dt>（Following element）</dt>
  <dd>
    <p>An element A is called a following element of an element B, if and only if B is a preceding element of A.</p>
  </dd>
  <dt>作者（Author）</dt>
  <dd>
    <p>创作文档及相关样式表的人。创作工具（authoring tool）是生成样式表的用户代理。</p>
  </dd>
  <dt>用户（User）</dt>
  <dd>
    <p>A user is a person who interacts with a user agent to view, hear, or otherwise use a document and its associated style sheet. The user may provide a personal style sheet that encodes personal preferences.</p>
  </dd>
  <dt>用户代理（User agent）</dt>
  <dd>
    <p>A user agent is any program that interprets a document written in the document language and applies associated style sheets according to the terms of this specification. A user agent may display a document, read it aloud, cause it to be printed, convert it to another format, etc.</p>
    <p>An HTML user agent is one that supports one or more of the HTML specifications. A user agent that supports XHTML [XHTML], but not HTML is not considered an HTML user agent for the purpose of conformance with this specification.</p>
  </dd>
  <dt>特性（Property）</dt>
  <dd>
    <p>CSS defines a finite set of parameters, called properties, that direct the rendering of a document. Each property has a name (e.g., 'color', 'font', or border') and a value (e.g., 'red', '12pt Times', or 'dotted'). Properties are attached to various parts of the document and to the page on which the document is to be displayed by the mechanisms of specificity, cascading, and inheritance (see the chapter on Assigning property values, Cascading, and Inheritance).</p>
  </dd>
</dl>

## 语法和基本数据类型
{:.heading}

### 关键字（Keywords）

关键字拥有标识符（identifiers）的形式，不能放在双引号（`"..."`）、单引号（`'...'`）之间。

#### 特定于供应商的扩展（Vendor-specific extensions）

CSS 中的标识符能够以连字符（`-`）或者下划线（`_`）开头。以连字符或下划线开头的关键字和属性名被保留用于特定于供应商的扩展，其具备以下两种形式之一：

- `'-' + vendor indentifier + '-' + meaningful name`
- `'_' + vendor indentifier + '_' + meaningful name`

#### 已知特定于供应商的扩展

前缀 | 组织
-----|------
-ms-, mso- | Microsoft
-moz- | Mozilla
-o-, -xv- | Opera Software
-atsc- | Advanced Television Standards Committee
-wap- | The WAP Forum
-khtml- | KDE
-webkit- | Apple
prince- | YesLogic
-ah- | Antenna House
-hp- | Hewlett Packard
-ro- | Real Object
-rim- | Research In Motion
-tc | TallComponents

### 字符和大小写

- 所有的 CSS 语法在 ASCII 范围内不区分大小写
- 反斜线（`\`）
  - 反斜线转义通常被认为是标识符或字符串的一部分，如：`\7B` 不是标点符号，即使 `{` 是；`\32` 允许在 class name 的首位，但 `2` 就不行。

### 语句（Statements）

任何级别的 CSS 样式表都是由一系列语句组成。语句分为两种：**at 规则**（at-rule）和**规则集**（rule set）。

### at 规则（At-rules）

at 规则以「@」开头，后面紧跟着标识符，如 `@import` `@page` 等。它由分号（`;`）之前的任何东西（包括分号）或者后面的第一个块（block）组成。在块中以及非忽略语句（non-ignored statement）后面的 `@import` 规则将被忽略。

### 块（Blocks）

一个块以左花括号（`{`）开始并以配对的右花括号（`}`）结束。

## CSS 属性
{:.heading}

CSS 2.1 中有超过 90 个属性。

CSS 中大部分属性只能设置一个值，但还存在一种能够将其他一些属性同时设置的复合属性，叫做「Shorthand Property」，例如`font``border``background`等。使用它，web 开发人员可以写出更简洁并且更具可读性的样式表，节省时间和精力。

## 使用方式
{:.heading}

在 HTML 文档中可以通过三种方式来使用 CSS——

### 外部样式

通过`<link>`标签引用外部 CSS 文件，这种方式既具灵活性又降低了维护成本，完全做到了**表现与结构分离**，符合 CSS 的设计目的。

{% highlight html %}
<link rel="stylesheet" href="example.css">
{% endhighlight %}

### 内部样式

将 CSS 写在`<style>`标签中。

{% highlight html %}
<style>
  body {
    font-family: "Microsoft Yahei", sans-serif;
    font-size: 1em;
    background: #FFF none no-repeat 0 0;
  }
</style>
{% endhighlight %}

### 内联样式

把 CSS 写在 HTML 标签上，将页面的表现与结构强耦合，这是最糟糕的方式！

{% highlight html %}
<p style="color: #333; line-height: 1.8;">example</p>
{% endhighlight %}

## 处理模型
{:.heading}

本段文字说明用户代理是如何支持 CSS 运作的一个可能的模型。这只是一个概念模型，真正的实现也许会有所不同。

在此模型中，用户代理会通过以下几个步骤处理源码：

1.  解析文档并创建文档树
2.  识别目标的媒体类型
3.  检索那些与已指定目标媒体类型的文档相关联的样式表

## 语法
{:.heading}

### 规则集、声明块及选择器

几条声明由分号分隔，用花括号括起来形成一个封闭块。

{% highlight css %}
body {
  font-family: "Microsoft Yahei", sans-serif;
  font-size: 1em;
  background: #FFF none no-repeat 0 0;
}
{% endhighlight %}

上面这段 CSS 代码中，整体是一个「规则」（rule），由「选择器」（selector）`body`和几条「声明」（declaration）组成。其中，每条声明又包括「属性名」（property name）和「属性值」（property value）两部分。以`font-size: 1em;`为例，`font-size`是属性名，`1em`是属性值。

## 资料参考
{:.heading}

- [Cascading Style Sheets (CSS) Snapshot 2010](http://www.w3.org/TR/CSS/){:target="_blank"}{:rel="nofollow external"}
- [Cascading Style Sheets](http://en.wikipedia.org/wiki/Cascading_Style_Sheets){:target="_blank"}{:rel="nofollow external"}
