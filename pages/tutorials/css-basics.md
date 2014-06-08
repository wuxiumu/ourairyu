---
layout: page
layout_type: sandwich

page_category: tutorial

title: CSS Basics
description: CSS 基础
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

## 其他
{:.heading}

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
