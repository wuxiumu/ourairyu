---
title: 用 DL 标签实现信息列表
categories:
  - web-development
tags:
  - CSS
  - HTML
  - 网页设计
  - 页面布局
published: false
---

在做网页时，经常会遇到各种各样的列表，其中有一类是这种：

![天猫商品详情页面截图（2013 年）](http://farm8.staticflickr.com/7318/8720728566_b25874fb75_o.jpg "天猫商品详情页面截图（2013 年）")

看到这个效果图，对于经验不足的人来说，他们的第一反应大概是用`table`来实现。确实，在布局方面用`table`比较容易操控，但现在大部分人都知道这个在上世纪九十年代用于网页布局的“老霸主”的最大缺陷——**损耗浏览器性能**！这与浏览器渲染引擎的在渲染 DOM 树时的工作原理有关。

既然`table`不行事儿了，就该轮到`div`和`ul`这对“哪有事儿哪到”的“人气兄弟”了！这两个也是被用到烂（滥用）的 HTML 标签。从外行和刚入行的人把“网页制作”叫成“DIV+CSS”就知道`div`在人们心中的地位有多么的“神圣”了……

截图中的部分实际上就是一套交易信息的定义：价格、配送方式、销量、分类等等。左边的是被定义的“项（term）”，右边是针对“项”的“说明”，也就是“描述（description）”。综合这个事物的本质、浏览器渲染、语义等方面来考虑，选择“定义列表（Definition List）”`dl`来实现是最合适不过的！“定义列表”这一套标签中，用`dl`来表示整套信息，`dt`来表示“项”，`dd`来表示“描述”。其中`dt`和`dd`分别是英文词组 Definition Term 与 Definition Description 的首字母缩写。

{% highlight html %}
<dl>
    <dt>价格</dt>
    <dd><small>&yen;</small><b>1599.00 - 1999.00</b></dd>
    <dt>配送</dt>
    <dd>北京 至 杭州 快递：10.00 EMS：20.00</dd>
    <dt>月销量</dt>
    <dd>11 件</dd>
    <dt>颜色分类</dt>
    <dd>
        <label><input type="radio" name="stype" checked="checked">柜台展示机 特价机 马里奥红</label>
        <label><input type="radio" name="stype">发顺丰马里奥银色+2款中文游戏</label>
    </dd>
    <dt>游戏机套餐</dt>
    <dd>
        <label><input type="radio" name="plan" checked="checked">套餐一</label>
        <label><input type="radio" name="plan">套餐二</label>
    </dd>
    <dt>数量</dt>
    <dd><input type="text" value="1"></dd>
</dl>
{% endhighlight %}

{% highlight css %}
dl, dd { overflow: hidden; *zoom: 1; }
dt { width: 5em; float: left; padding-right: 1em; }
dd { margin-bottom: .5em; }
{% endhighlight %}

本文主要内容是**用`dl`标签来实现商品信息列表的布局**，右侧商品款式等选择的实现不在本文讨论范围内，故该 [demo]({{ site.data.url.root }}/{{ site.url.demo }}layout/definition-list.html "查看示例") 只将主体部分实现。兼容 IE6 及以上和其他标准浏览器。

## 总结
{:.heading}

只要需求是**左侧为标题，右侧为内容的两栏结构的列表（或称为“表格”）**，都可以用本文所阐述的方法来实现！
