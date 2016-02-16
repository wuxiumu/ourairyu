---
title: IE6、IE7 及 IE8 怪癖模式下空块级非替换元素高度不为 0
categories:
  - web-development
tags:
  - css
  - hasLayout
  - 块级
  - 非替换元素
published: false
---

写网页时会发现在 IE8 以下的 IE 浏览器中以及 IE8 的怪癖模式下，有时一个空块级非替换元素（例如：`<div>`）的高度不为0，并且高度值跟`font-size`有关；然而在`font-size`为 0 的时候，高度也不会为 0。如下图：

![示意图](http://pic.yupoo.com/ourai_v/BqNrKHd5/13vbap.jpg)

## HTML代码如下
{:.heading}

{% highlight html %}
<style type="text/css">
  div {
    background-color: gold;
    zoom: 1;
    font-size: 0px;
    line-height: 0px;
    padding: 0;
  }
</style>

<div></div>
{% endhighlight %}

出现此问题的原因是**空块级非替换元素触发了 hasLayout**，不触发hasLayout或者在空元素内加入HTML空注释便可解决问题。如下：

{% highlight html %}
<div><!-- --></div>
{% endhighlight %}
