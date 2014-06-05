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

CSS 2.1 中有超过 90 个属性。

几条声明由分号分隔，用花括号括起来形成一个封闭块。

{% highlight css %}
body {
  font-family: "Microsoft Yahei", sans-serif;
  font-size: 1em;
  background: #FFF none no-repeat 0 0;
}
{% endhighlight %}

上面这段 CSS 代码中，整体是一个「规则」（rule），由「选择器」（selector）`body`和几条「声明」（declaration）组成。其中，每条声明又包括「属性名」（property name）和「属性值」（property value）两部分。以`font-size: 1em;`为例，`font-size`是属性名，`1em`是属性值。
