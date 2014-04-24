---
layout: article
title: 检测当前浏览器版本的方法
categories:
  - JavaScript
tags:
  - JavaScript
  - 浏览器
published: false
comments: true
---

    var browser = "Unknown";
    var version = "0";
    // NN4+
    if(document.layers) {
      browser = "NN";
      version = "4.0";
      if(navigator.securityPolicy) {
        version = "4.7+";
      }
    }
    else if(document.all) {
      browser = "IE";
      version = "4";
    }
    // IE5+
    if(window.clipboardData) {
      browser = "IE";
      version = "5+";
    }
    // Firefox/NN6+
    else if(window.sidebar) {
      browser = "Firefox";
      version = "1+";
    }
    document.write(browser + " " + version);
