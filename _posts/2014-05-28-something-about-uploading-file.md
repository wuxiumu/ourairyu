---
layout: article
title: 上传文件这件事，蛋疼何止一点点！
categories:
  - Front-end Development
tags:
  - HTML
  - JavaScript
  - XHR
  - AJAX
comments: true
---

在做 Web App 时，不可避免地要上传一些文件，最常用到的就是图片。在线相册及图片收藏网站等以提供图片存储服务的站点自不用说，社交网络的头像、发布信息等都需要上传图片的功能。提供电子邮件服务的站点，除了图片还需要上传文档等其他类型文件的功能。

如果是几年前，这种功能用最原始的`<form>`（下文用「表单」指代）就能轻松地实现，只需在提交时加个遮罩层防止用户瞎点就可以了。然而，随着 web 的发展与人们审美的提高，这种简单粗暴的方式越来越不受人待见——就像在大家都懂得打扮自己时你却还灰头土脸穿得跟工地里的农民工一样——太不优雅！

表单的「挫」点主要体现在以下几个方面：

1.  **土掉渣**

    虽然`<input type="file">`（下文用「原生上传控件」指代）在各个浏览器中的外观不甚相同，但有共同的特点——丑，并固执着！说它「固执」是因为无法通过 CSS 对其进行外观上的改造。

2.  **互动性差**

    如果是理想情况下，文件会很快传完，用户的心情会很愉快；但当遇到文件体积过大或者网速过慢的情况，在等了几分钟、十几分钟甚至是几十分钟后文件还没传完，并且不知道已经上传完多少以及大约还需多久能传完时，估计用户就该抓狂想要砸电脑了吧！

3.  **不能进行其他操作**

    `<form>`在提交后，虽然浏览器显示的是当前页面，但地址栏中的 URL 已经改变，因为是在等待文件完全上传到服务器，所以页面暂时没有刷新。这时用户的操作行为就受到了限制，只能默默地等待文件上传结束……

一个人长得丑，那没有办法，这是天生的，但不代表没有魅力——可以靠着装打扮、学识经历、金钱地位等弥补天生的缺陷。「上传文件」也可以像「矮穷挫」一样逆袭成为「高帅富」！至于如何逆袭，我相信每个人都有自己的见解，这里就说说我所想、我所了解的。

### 换个造型

即使原生上传控件本身无法通过 CSS 对其进行改造，可还是有办法让它看起来很「帅」的——用口红、胭脂等化妆品将其丑陋的外表遮掩起来。

{% highlight html %}
<button type="button">选择文件</button>
<form action="/upload_file" method="post" enctype="multipart/form-data">
  <input type="file" name="file">
</form>

<style>
  form {
    display: none;
  }
</style>

<script>
  // !!! Include jQuery first
  $(":button").click(function() {
    $(":file").trigger("click");
  });
</script>
{% endhighlight %}

当写了一个非常好看的替代原生上传控件的按钮，用以上方式通过 Chrome 或 Firefox 弹出系统对话框选择文件并成功上传到服务器后，想必会雀跃不已地夸自己「我真特么是个天才！」吧？

每实现一个新功能后必定要测试一下 IE 的兼容性。打开 IE9，重复一遍操作步骤，本来以为会正常弹出对话框的，但没想到没有任何反应！

{% highlight js %}
SCRIPT5: 拒绝访问。
{% endhighlight %}

「尼玛！！！有没有搞错？！IE9 居然会有问题？！话说，这个异常是什么意思啊？！问题出在哪里都没有提示！！！」——看到控制台中输出那行红色的字符串之后，估计你的内心当中有如千万匹草泥马在奔腾！

你肯定以为 IE9 会比 IE8 高级些，可事实往往是残酷的！在表单处理上，它俩的安全策略都差不多——不允许利用 JavaScript 触发原生上传控件的`click`事件。

那怎样才能既隐藏掉原生上传控件，又弹出选择文件的系统对话框呢？

{% highlight html %}
<form action="/upload_file" method="post" enctype="multipart/form-data">
  <span>选择文件</span>
  <input type="file" name="file">
</form>

<style>
  form {
    display: inline-block;
    position: relative;
    overflow: hidden;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 10em;
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    opacity: 0;
    cursor: pointer;
  }
</style>
{% endhighlight %}

虽然说是「隐藏」，但只是让原生上传控件「不可见」而已，它还是稳稳当当地在表单中占据着空间位置。当点击所看到的「按钮」时，实际点击的是原生上传控件，这样一来就触发了浏览器默认行为，即打开选择文件对话框。

### XHR 上传

### 跨域
