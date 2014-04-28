---
layout: article
title: 获取 JavaScript 脚本文件路径
categories:
  - Front-end
tags:
  - JavaScript
  - URL
comments: true
---

在开发过程中，有时需要动态获取文件的 URL，获取 JS 文件的 URL 是最常见的需求，例如像 [Sea.js](http://seajs.org) 等 Module Loader 就会用到。

目前常被用到的有以下几种方式，它们有各自的优缺点。

### script 标签

通过获取最后一个`<script>`标签的`src`属性来得到脚本文件的 URL。这种方式的关键点是**正在执行的语句所在的 JS 文件是“当时最后的 JS 文件”**。Sea.js 中就是用的此方法。

正因如此，瓶颈也在这里。这种方式只能在同一个文件中即时执行才有效，不能延迟执行及写成通用的 method 供其他地方调用，否则获取到的不一定是哪个 JS 文件的 URL 了。不过这种方式的优点就是能够兼容各个浏览器。

{% highlight javascript %}
function scriptPath() {
  var scripts = document.scripts;
  var script = scripts[ scripts.length - 1 ];

  return script.hasAttribute ?
    script.src :
    // hack for IE8-
    // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
    script.getAttribute( "src", 4 );
}

var url = scriptPath();
{% endhighlight %}

### 捕获异常

这是一个从[司徒正美的博文](http://www.cnblogs.com/rubylouvre/archive/2010/04/06/1705817.html)中看到的较为“聪明”的方法，利用了 exception 信息中会带有出错文件及位置的特点来获取。

这种方式可以写为一个通用的 method，但其还是有两个较为严重的缺陷：

1. 兼容性差，IE 和 Opera 基本都被排挤在外
2. 在调用时必须在回调函数中抛出异常

{% highlight javascript %}
function scriptPath( callback ) {
  var url = "";

  if ( typeof callback === "function" ) {
    try {
      callback();
    }
    catch( e ) {
      // Firefox
      if ( e.fileName ) {
        url = e.fileName;
      }
      // Safari
      else if ( e.sourceURL ) {
        url = e.sourceURL;
      }
      // Opera 9
      else if ( e.stacktrace ) {
        url = (e.stacktrace.match( /\(\) in\s+(.*?\:\/\/\S+)/m ) || ["", ""])[1];
      }
      // Chrome 4+/IE 10+
      else if ( e.stack ) {
        url = (e.stack.match( /((http|file)\:\/{2,3}\S+\/\S+\.[a-z0-9]+)/i ) || ['',''])[1];
      }
    }
  }

  return url;
}

// must throw an exception
var url = scriptPath(function() {
      throw Error( "WTF!!!" );
    });
{% endhighlight %}
