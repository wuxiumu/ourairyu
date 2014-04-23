---
layout: article
title: 容器与内部元素外边距重叠
categories:
  - Front-end
tags:
  - CSS
  - hasLayout
  - 外边距
  - 重叠
---

有时我们在写网页的时候会想让header距离页面顶部有段距离，于是这时就会用到CSS中的“margin-top”这一样式。CSS和HTML代码分别如下：

```css
#container {
  background-color: gold;
}

#header {
  background-color: silver;
  margin-top: 50px;
  text-align: center;     /* 为了让文字居中 */
}

```

```html
<div id="container">
  <div id="header">Header</div>;
</div>;

```

由于缺乏对W3C标准和CSS规范的认识，使用的时候就会出现明明没对容器设置“margin-top”，但是它随着header一起产生外边距了（容器和子元素都必须是**块级非替换元素**），理想状态下容器的高度应该是内部元素的高度加上内部元素上外边距，而实际情况是容器与内部元素同样大小，如下图：

实际效果 | 理想效果
-------- | --------
[![实际效果](http://pic.yupoo.com/ourai_v/BqHGTXMD/6iFwU.png)](http://pic.yupoo.com/ourai_v/BqHGTXMD/6iFwU.png "实际效果（点击看大图）") | [![理想效果](http://pic.yupoo.com/ourai_v/BqHGUaVf/EmEen.png)](http://pic.yupoo.com/ourai_v/BqHGUaVf/EmEen.png "理想效果（点击看大图）")

出现这种情况的原因是：**容器与它的子元素发生了外边距重叠**。要想解决，只需要使容器创建“Block Formatting Context”（IE7以上及非IE的标准浏览器）或者激活hasLayout（IE8以下浏览器）就可以。在容器的CSS中添加如下样式：

```css
#container {
  overflow: auto;   /* 创建“Block Formatting Context” */
  zoom: 1;          /* 激活hasLayout */
}

```
