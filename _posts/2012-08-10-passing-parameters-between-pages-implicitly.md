---
layout: article
title: 页面间隐式传递参数
categories:
  - Front-end
tags:
  - JavaScript
comments: true
---

在工作的开发过程中有个查看报表的需求——从某个页面点击按钮打开报表页面（该页面为新建窗口）。进入报表页面的入口不是固定的页面，也不是固定的按钮，因此不同种类的报表传递的参数不同，并且各组参数之间没什么共同性。原本的实现方式是通过 URL 的 queryString 将参数传递到报表页面，正如前面所说，**不同种类的报表传递的参数不同**，于是报表页面就会出现以下一些问题：

- URL 过长，看起来很不美观；
- 需要对 queryString 进行解析与判断来判别是什么类型的报表；
- 如果未来多加一些类型的报表的话，判断也会随之增多，这样不仅代码量增加，维护起来也有点困难，还影响性能；
- 安全性欠佳，通过 queryString 找到规律的话，通过浏览器地址栏随便地输入一个符合规律的 URL 就能获得想要看的数据。

鉴于以上几点，我利用父子页面能够互相访问对方 window 对象的特性，想了一个“**页面间隐式传递参数**”的方式。

## 父页面（入口页面） JavaScript 代码
{:.heading}

{% highlight js %}
window.windowPool = [];             // 用于存储子页面的 window 对象及隐式传递的参数

var newWin = window.open( url ),    // 新建窗口，url 为报表页面地址
  reportParams = {};                // 报表所需参数
  
window.windowPool.push({
  "window": newWin,
  "parameter": reportParams
});
{% endhighlight %}

看到上段代码，也许会奇怪地问：“为什么要将子页面的 window 对象和报表参数分开，而不是将报表参数绑定在子页面的 window 对象上？”这是因为子页面如果刷新了的话，报表参数就会失效了。将子页面（报表页面）的 window 对象与报表参数组合成一个 JSON 添加到数组里是为了避免当从父页面（入口页面）打开多个显示不同种类报表的报表页面时，早先打开的报表页面刷新操作而引起的显示后打开的报表页面内容的问题。

## 子页面（报表页面） JavaScript 代码
{:.heading}

{% highlight js %}
var params, index = 0;

for( ; index < opener.windowPool.length; index++ ) {
  if ( opener.windowPool[index].window === window ) {
    params = opener.windowPool[index].parameter;
    break;
  }
}
{% endhighlight %}

该方式在除了 IE6 之外的浏览器都能正常运行，IE6 没测试过，不清楚兼容性如何。
