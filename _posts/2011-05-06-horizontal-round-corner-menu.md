---
title: 圆角横向菜单实现技巧
categories:
  - layout
tags:
  - HTML
  - CSS
published: false
---

相信肯定有一部分人为了「如何才能够在任何浏览器当中都能显示圆角的菜单」而困扰。这篇文章的目的就是解决这些人的困难！

因为 IE 不支持`border-radius`这个 CSS3 的特性，所以我们只好用图片来实现了：

1. 做两张图片作为菜单项的背景图，一张带有左圆角，一边带有右圆角，左圆角那张图的宽度尽量长些，用来适应菜单项的不同宽度，右圆角那张图的宽度短些，避免将左圆角给遮盖住；
2. 在`<li>`标签里面放入`<a>`标签，再在`<a>`标签里面放入`<span>`标签，这么做是为了实现鼠标悬停等不同的菜单状态；
3. 设置`<a>`和`<span>`标签的背景图。

下面我将实现圆角菜单的主要代码发表出来，至于扩展部分就留给各位根据自己实际情况来调整吧。

{% highlight html %}
<ul>
  <li><a><span>HTC</span></a></li>
  <li><a><span>Apple</span></a></li>
  <li><a><span>Blackberry</span></a></li>
  <li><a><span>Nokia</span></a></li>
  <li><a><span>Samsung</span></a></li>
</ul>
{% endhighlight %}

{% highlight css %}
ul {
  float: left;
  list-style: none inside none;
}
 
li {
  float: left;
  margin-right: 5px;
}

li a {
  display: block;
  background: url('...') no-repeat right top;   /* 在外层a标签上用菜单的右圆角 */
  padding-right: 10px;              /* 这样右圆角就不会被里面span标签的背景所遮盖 */
}

li a span {
  display: block;
  background: url('...') no-repeat left top;    /* 在里层span标签上用菜单的左圆角 */
  padding-left: 10px;
}

/* 以下是鼠标悬停效果，作为扩展样式使用，兼容各个浏览器 */
li a:hover {
  background-position: *px *px;
}

li a:hover span {
  background-position: *px *px;
}
{% endhighlight %}
