---
title: 如何调试一个页面
date: 2016-03-05 11:57:23 +0800
categories:
  - web-development
tags:
  - frontend-web-development
  - mac-os
image: posts/20160305/vb-step-4.jpg
series: skills-of-a-frontend-engineer
---

调试页面是前端开发中必不可少的一个环节，由于开发环境的多样性和终端种类越来越多，复杂度也在不断上升。

我所写的这些只是万万千千方法中的几种，肯定有更优的方案，仅供参考。

**本文中的一切操作皆在 Mac 中进行。**

## 域名绑定

用域名访问页面进行调试有很多益处，我就不一一列举了。所以，在进行调试之前需要先做下域名绑定。有的团队会由开发 leader 统一进行操作，而有的没有这个「杀必死」，那就只好自己来了。

### Nginx 跳转

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

## 代理服务器

在跨环境、跨设备的调试场景中经常会需要用到代理服务器，我所使用的是基于 Node.js 的 [LivePool][lp-url]{:target="_blank"}{:rel="external nofollow"}。

终端输入 `npm install -g livepool` 进行全局安装，之后在任意位置输入 `livepool` 就可以开启代理服务。

<figure>
  <img src="{{ 'posts/20160305/start-livepool.jpg' | asset_path }}" alt="启动 LivePool">
  <figcaption>启动 LivePool</figcaption>
</figure>

**LivePool 在运行时会在运行目录中生成规则和日志文件，建议新建一个 `livepool` 文件夹专门用来运行。**

## 桌面端

### 虚拟机中

因为 IE 版本的关系，最可靠的调试方式可能就是装虚拟机了，通过其他方式调试总会与用那个版本的真正的 IE 有所差别。

Mac 中普遍使用的虚拟机是 VirtualBox，所以这里就拿它来说明。

在虚拟机中打开 IE 浏览器，找到工具栏中的「工具」选项。

<figure>
  <img src="{{ 'posts/20160305/vb-step-1.jpg' | asset_path }}" alt="找到「Internet 选项」">
  <figcaption>找到「Internet 选项」</figcaption>
</figure>

点击「Internet 选项」打开对话框并切换到「连接」选项卡，点击「局域网设置」。

<figure>
  <img src="{{ 'posts/20160305/vb-step-2.jpg' | asset_path }}" alt="点击「连接」选项卡中的「局域网设置」">
  <figcaption>点击「连接」选项卡中的「局域网设置」</figcaption>
</figure>

查看宿主机器的 IP，可以在终端输入命令 `ifconfig | grep "inet"`。还有一个更为简单方便的方法——按住 <kbd>option</kbd> 键点击 <i class="fa fa-wifi"></i> 图标。

<figure>
  <img src="{{ 'posts/20160305/check-ip.jpg' | asset_path }}" alt="快速查看宿主机器 IP">
  <figcaption>快速查看宿主机器 IP</figcaption>
</figure>

选中「为 LAN 使用代理服务器」，然后填入宿主机器的 IP 和代理服务器的端口号（如果是 LivePool 的话，端口号为 8090）。

<figure>
  <img src="{{ 'posts/20160305/vb-step-3.jpg' | asset_path }}" alt="输入宿主机器 IP 和代理服务器端口号">
  <figcaption>输入宿主机器 IP 和代理服务器端口号</figcaption>
</figure>

设置完代理服务器后，在浏览器地址栏输入自定义的域名即可访问本地网站了——

<figure>
  <img src="{{ 'posts/20160305/vb-step-4.jpg' | asset_path }}" alt="访问本地网站">
  <figcaption>访问本地网站</figcaption>
</figure>

### 线上代码

要在本地调试已经上线的代码，需要用到文件映射功能。

访问 `http://localhost:8002/` 浏览 LivePool 的 UI 界面配置映射规则，将线上文件与本地文件建立关系。如此一来，请求线上文件的 URL 时真正访问的是本地文件的代码。（关于 UI 界面的使用方式及规则的配置方法请看 [LivePool 的官方文档][lp-url]{:target="_blank"}{:rel="external nofollow"}）

除了需要配置映射规则外，也要对浏览器设置一下代理服务器。

如果常用 Chrome 进行开发，并且不用调试其他浏览器中的效果的话，可以安装浏览器插件 [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif){:target="_blank"}{:rel="external nofollow"} 进行代理切换，这样很是方便。

<figure>
  <img src="{{ 'posts/20160305/switchyomega.png' | asset_path }}" alt="Proxy SwitchyOmega 的配置界面">
  <figcaption>Proxy SwitchyOmega 的配置界面</figcaption>
</figure>

想要调试其他浏览器的话，就得全局代理了。

## 移动端

### 模拟调试

在开发的初期阶段，可以先用桌面浏览器去模拟移动端的显示效果。虽然效果有所差异，但大部分现代浏览器都具备此功能。

### 实机调试

在后期时间允许的情况下，为了保证质量，要实机测试一下是否存在致命问题。如果真的出现了问题，得连接到移动设备上进行调试。

iOS 本身提供了与 Mac 联调的功能。

### 微信浏览器

在微信浏览器中好好的页面总是会出现各种奇怪的问题——本应该被支持的选择器它没有支持，本能够正常工作的 JavaScript 代码发生了异常——它就像是 Windows 中的 IE6。

还好腾讯官方提供了[微信调试工具](http://blog.qqbrowser.cc){:target="_blank"}{:rel="external nofollow"}来辅助我们，不必瞎猫碰死耗子般地一行一行修改代码去排错。

[lp-url]: http://rehorn.github.io/livepool/
