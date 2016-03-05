---
title: 如何调试一个页面
date: 2016-03-05 11:57:23 +0800
categories:
  - web-development
tags:
  - frontend-web-development
  - mac-os
image: posts/20160305/vb-step-4.jpg
---

调试页面是前端开发中必不可少的一个环节，由于开发环境的多样性和终端种类越来越多，复杂度也在不断上升。

我所写的这些只是万万千千方法中的几种，肯定有更优的方案，仅供参考。

**本文中的一切操作皆在 Mac 下完成。**

## 域名绑定

启动服务后用域名访问页面进行调试有很多益处，我就不一一列举了。所以在进行调试之前，先做下域名绑定。有的团队会由开发 leader 统一进行操作，而有的没有这个「杀必死」，那就只好自己来了。

### 配置 Nginx

如果已经安装了 Homebrew，在终端输入 `brew install nginx` 来下载安装。

进入到安装目录 `/usr/local/etc/nginx` 修改 `nginx.conf` 文件。**只需要将下面参数添加进去，而不要把原来已有的删掉！**

{% highlight nginx %}
server {
  listen 80;
  server_name localhost;
  location / {
    proxy_pass http://127.0.0.1:8080;
  }
}
{% endhighlight %}

终端输入 `nginx` 启动服务。如果之前已经启动过，则需要输入 `nginx -s reload`。

### IP 映射

修改 `/etc/hosts` 文件，添加一行 `127.0.0.1  YOUR_DOMAIN`。其中 `YOUR_DOMAIN` 可以是任意符合域名命名规范的值。

## 启用代理

有些场景需要用到代理，如调试线上静态文件，在虚拟机中调试等。我所用的是基于 Node.js 的 [LivePool](https://github.com/rehorn/livepool){:target="_blank"}{:rel="external nofollow"}。

终端输入 `npm install -g livepool` 全局安装 LivePool，之后在任意位置输入 `livepool` 就可以开启代理服务。

<figure>
  <img src="{{ 'posts/20160305/start-livepool.png' | asset_path }}" alt="启动 LivePool">
  <figcaption>启动 LivePool</figcaption>
</figure>

**它在运行时会在运行目录中生成规则和日志文件，建议新建一个 `livepool` 文件夹专门用来运行 LivePool。**

## 调试页面

### 虚拟机

因为 IE 版本的关系，最可靠的调试方式可能就是装虚拟机了，通过其他方式调试总会与用那个版本的真正的 IE 有所差别。

Mac 中普遍使用的虚拟机是 VirtualBox，所以这里就拿它来说明。

在虚拟中打开 IE 浏览器，找到工具栏中的「工具」选项。

<figure>
  <img src="{{ 'posts/20160305/vb-step-1.png' | asset_path }}" alt="找到「工具」选项">
  <figcaption>找到「工具」选项</figcaption>
</figure>

点击「Internet 选项」打开对话框并切换到「连接」选项卡，点击「局域网设置」。

<figure>
  <img src="{{ 'posts/20160305/vb-step-2.png' | asset_path }}" alt="点击「连接」选项卡中的「局域网设置」">
  <figcaption>点击「连接」选项卡中的「局域网设置」</figcaption>
</figure>

选中「为 LAN 使用代理服务器」，然后填入宿主机器的 IP 和代理服务器的端口号（如果是 LivePool 的话，端口号为 8090）。

<figure>
  <img src="{{ 'posts/20160305/check-ip.png' | asset_path }}" alt="按住「option」键点击「网络」图标">
  <figcaption>按住 <kbd>option</kbd> 键点击 <i class="fa fa-wifi"></i> 图标</figcaption>
</figure>

<figure>
  <img src="{{ 'posts/20160305/vb-step-3.png' | asset_path }}" alt="输入宿主机器 IP 和代理服务器端口号">
  <figcaption>输入宿主机器 IP 和代理服务器端口号</figcaption>
</figure>

设置完代理服务器后，在浏览器地址栏输入自定义的域名即可访问本地网站了——

<figure>
  <img src="{{ 'posts/20160305/vb-step-4.jpg' | asset_path }}" alt="访问本地网站">
  <figcaption>访问本地网站</figcaption>
</figure>
