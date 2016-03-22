---
title: 给网站戴上「安全套」
date: 2016-03-22 17:55:48 +0800
categories:
  - web-development
tags:
  - web-security
  - linux
  - centos
  - web-server
  - nginx
image: posts/20160322/https-protocol.png
series: skills-of-a-webmaster
---

上周六我去一家售后服务点参加了「[冬日保养计划](http://www.niu.com/niucare){:rel="external nofollow"}{:target="_blank"}」，虽然现在是春天……这是牛电科技为小牛电动车车主所提供的一个售后服务，在去年 11 月 25 日之前购入的可以对车子进行一次免费保养，同时还赠送了一份人车保险——「[牛油保](http://www.niu.com/niucover){:rel="external nofollow"}{:target="_blank"}」。不得不说，虽然各方面有些不足，但小牛做得还是不错的！

<figure>
  <img src="{{ 'posts/20160322/niucare.jpg' | asset_path }}" alt="冬日保养计划">
  <figcaption>冬日保养计划</figcaption>
</figure>

不像其他电动车厂商，小牛对用户的安全问题比较重视，所以推出了这个计划和保险。昨天下班时，手机收到了一条由牛电科技发来的短信。

<figure>
  <img src="{{ 'posts/20160322/niucover.jpg' | asset_path }}" alt="牛油保">
  <figcaption>牛油保</figcaption>
</figure>

就连外界都对我们的安全那么关心，我们有什么理由不去注重自己的安全呢？不仅仅是自身，还应该包括与自己相关的事物的安全，比如网站。

网站安全包含很多方面，本文所要说的是没什么技术含量的，只需要做一些简单配置的——你想的没错，就是 HTTPS。

## 事前说明

就在昨天，我做了一个决定——全站开启 HTTPS。

### 缘由

虽然是自己的网站，但我也会时不时地访问一下，体验并琢磨用户在浏览网站和阅读文章时的感受。无论是电脑还是手机，总会出现碍眼的东西！

<figure>
  <img src="{{ 'posts/20160322/hijacked.jpg' | asset_path }}" alt="手机访问「欧雷流」">
  <figcaption>手机访问「欧雷流」</figcaption>
</figure>

看到图中右下角那个「中国移动」的图标没有？按住可以拖动到屏幕中的任何位置，就像 iOS 提供的那个辅助用的 AssistiveTouch 一样；点击后会出现一个显示剩余流量和流量套餐的弹层。

<figure>
  <img src="{{ 'posts/20160322/network-traffic.jpg' | asset_path }}" alt="网络流量和流量套餐">
  <figcaption>网络流量和流量套餐</figcaption>
</figure>

是不是觉得中国移动特别贴心，在你没用 WiFi 浏览网页时能够时刻监控并提醒你剩余流量？如果换做是中国电信，弹出的就是浮窗广告了，这回你还觉得贴心么？

<blockquote>
  <p>Too young, too simple! Sometimes naive!</p>
  <footer>网络</footer>
</blockquote>

不管你觉得贴不贴心，实际上它们都做了一件极其恶心的事情——HTTP 劫持！无论是作为网站用户还是作为网站管理员，如果你所在浏览的网站已经被网络运营商劫持了，那么你的数据信息的安全正在遭受威胁！

### 声明

为了你本人及你的网站着想，我有必要事先声明一下——

<blockquote>
  <p>本文中所描述的是配置<strong>全站 HTTPS</strong>，示例代码中用的是本站的域名和目录路径，并且除了域名都是虚构的，在操作时请替换成自己的。</p>
  <p>我认为开启全站 HTTPS 是条「不归路」，也就是说，要再改回 HTTP 会有很麻烦的后果。所以，<strong>在进行配置之前请再三考虑对你来说是否真的有必要这么做</strong>。</p>
  <footer>欧雷</footer>
</blockquote>

如果你选择继续往下看，代表已经知道后果并做好相应的心理准备了。

## 传输加密

现如今，在访问一个网站时其网址大多为 `http://` 开头。懂点网络知识的都知道 HTTP 是不加密的明文传输，没做任何安全保障措施，黑客可以不费吹灰之力就能拿到数据，运营商能够随意利用你所访问的网站做些恶心的小动作。为了避免那些「杯具」，网站需要戴上名为「SSL」的「安全套」。

根据不同的操作系统和服务器环境「戴法」也不尽相同，这里只说 CentOS + Nginx 的情况。

### 申请 SSL 证书

给网站加 SSL 需要证书，在以前都是收费的，而且较贵，这对于个人站长来说无疑是一笔不小的开销，增加了运营成本。然而现在有很多免费证书，为「全民 HTTPS 时代」提供了极大的方便！我所使用的是「沃通」所提供的免费 SSL 证书。

访问沃通数字证书商店的[申请免费 SSL 证书页面](https://buy.wosign.com/free/?lan=cn){:rel="external nofollow"}{:target="_blank"}，填入各项信息后把生成的证书下载到本地；将压缩包解压，找到里面的 `for Nginx` 压缩包再解压就是证书文件了。

<figure>
  <img src="{{ 'posts/20160322/wosign-certificate.png' | asset_path }}" alt="沃通免费 SSL 证书">
  <figcaption>沃通免费 SSL 证书</figcaption>
</figure>

### 配置 Nginx

在进行配置之前，需要将沃通生成的 SSL 证书传到服务器上。因为我没安装任何 FTP 应用，所以使用命令行通过 `scp` 命令把文件上传过去。

{% highlight bash %}
scp ourai.ws_sha256_cn/for\ Nginx/1_ourai.ws_bundle.crt user@ourai.ws:/home/www/ourai.ws.crt

scp ourai.ws_sha256_cn/for\ Nginx/2_ourai.ws.key user@ourai.ws:/home/www/ourai.ws.key
{% endhighlight %}

接下来就是修改 Nginx 的配置文件了。可以在服务器上用 `vim` 命令直接修改，也可以拷贝到本地用 Sublime Text 之类的图形化编辑器修改完再传到服务器上。所增加的配置内容主要如下：

{% highlight nginx %}
server {
  listen       80;
  listen       443 ssl;      # 对 443 端口进行 SSL 加密
  server_name  ourai.ws;
  root         /home/www/site;

  # 沃通生成的 SSL 证书的存放位置
  ssl_certificate           /home/www/ourai.ws.crt;
  ssl_certificate_key       /home/www/ourai.ws.key;
  # 其他 SSL 相关设置
  ssl_session_timeout       10m;
  ssl_protocols             TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers               EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES;
  ssl_prefer_server_ciphers on;

  # 所有 HTTP 访问都永久重定向（301）到 HTTPS
  if ( $scheme = http ) {
    rewrite ^/(.*) https://$server_name/$1 permanent;
  }
}
{% endhighlight %}

将配置文件保存并 `nginx -s reload` 重启 Nginx，用浏览器访问一下自己的网站看看效果。

<figure>
  <img src="{{ 'posts/20160322/https-protocol.png' | asset_path }}" alt="HTTPS 生效">
  <figcaption>HTTPS 生效</figcaption>
</figure>

很酷很屌有没有！逼格又上升了一个档次！！妈妈再也不用担心我的网站被强行插入了！！！

先别得瑟，这还只是披了一层 HTTPS 的外衣，虽然能够抵御一些攻击，但距离真正的 HTTPS 还差点。

### 加强安全性

在启用 HTTPS 后，一般会将通过 HTTP 访问的链接跳转到 HTTPS 的。

用户在浏览器地址栏中输入网址时基本不会带协议，而是直接输入域名，这时浏览器会先通过 HTTP 的方式访问资源从而在没有进行加密的情况下与服务器建立了连接，黑客会在跳转到 HTTPS 之前的空隙进行攻击，即「[中间人攻击](http://baike.baidu.com/view/1531871.htm){:rel="external nofollow"}{:target="_blank"}」。

<blockquote>
  <p>你连接到一个免费 WiFi 接入点，然后开始浏览网站，访问你的网上银行，查看你的支出，并且支付一些订单。很不幸，你接入的 WiFi 实际上是黑客的笔记本热点，他们拦截了你最初的 HTTP 请求，然后跳转到一个你银行网站一模一样的钓鱼网站。 现在，你的隐私数据暴露给黑客了。</p>
  <footer><a href="https://developer.mozilla.org/zh-CN/docs/Security/HTTP_Strict_Transport_Security" target="_blank" rel="external nofollow">Mozilla 开发者网络</a></footer>
</blockquote>

那么，该如何防止自己的用户在访问网站时遭遇上述事情呢？给自己的网站再加上一层保护——<a href="http://baike.baidu.com/view/4723586.htm" target="_blank" rel="external nofollow"><abbr title="HTTP Strict Transport Security">HSTS</abbr></a>。

Nginx 中配置起来还是很简单的，只需在配置了 HTTPS 的 `server` 块中加一句 `add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";`。

{% highlight nginx %}
server {
  listen       80;
  listen       443 ssl;      # 对 443 端口进行 SSL 加密
  server_name  ourai.ws;
  root         /home/www/site;

  # 沃通生成的 SSL 证书的存放位置
  ssl_certificate           /home/www/ourai.ws.crt;
  ssl_certificate_key       /home/www/ourai.ws.key;
  # 其他 SSL 相关设置
  ssl_session_timeout       10m;
  ssl_protocols             TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers               EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES;
  ssl_prefer_server_ciphers on;

  # 主域名和子域名都启用 HSTS，过期时间为两年
  add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

  # 所有 HTTP 访问都永久重定向（301）到 HTTPS
  if ( $scheme = http ) {
    rewrite ^/(.*) https://$server_name/$1 permanent;
  }
}
{% endhighlight %}

别忘记 `nginx -s reload` 重启服务器哦！

新建一个标签页，打开 Chrome DevTools 切换到「Network」选项卡，「Preserve log」前面打上勾后再次访问网站，在日志的最上面有两个看起来相同的网络请求。

<figure>
  <img src="{{ 'posts/20160322/log-of-requests.png' | asset_path }}" alt="网络请求日志">
  <figcaption>网络请求日志</figcaption>
</figure>

然而它们并不一样，第一个是 HTTP 请求，第二个是跳转后的 HTTPS 请求。再仔细点看会发现那个 HTTP 请求的状态码变了，不是 `301` 了，而是从未见过的 `307`！

<figure>
  <img src="{{ 'posts/20160322/http-code-307.png' | asset_path }}" alt="307 状态码">
  <figcaption>307 状态码</figcaption>
</figure>

这个 `307` 跳转不是服务器端进行的，而是浏览器识别到网站设置了 HSTS 而自己进行的客户端跳转。

<figure>
  <img src="{{ 'posts/20160322/response-header-hsts.png' | asset_path }}" alt="响应头中的 HSTS">
  <figcaption>响应头中的 HSTS</figcaption>
</figure>

如果设置了 HSTS，用户只要用某个现代浏览器通过 HTTPS 的方式访问过网站一次，以后即使用 HTTP 访问网站也会在请求到达服务器之前就被浏览器拦截并改成 HTTPS 请求服务器。

## 后记

SSL 就像是安全套，虽提高了安全性却失去了快感。HTTPS 使从发起请求到看到页面的步骤加长，响应速度必定比 HTTP 慢，性能也会有所降低。

支持 HTTPS 后，只有当页面中的静态资源（图片、脚本、样式表等）全部为 `https://` 开头时才会被浏览器认为是「安全的」，网址前面会显示锁头图标。

网上搜出来的启用 HTTPS 的教程文章基本都只讲「如何配置 SSL」而没有提到「添加 HSTS」。我也是经网友提醒才给网站增加了 HSTS 以提高安全性，谢谢他。:-)

网站就是战场，是站长与黑客交手的地方。在谈「安全」时，从来就没有绝对的安全，就像安全套不能百分百避免中标。不存在一劳永逸的银弹，就是见招拆招，正所谓「道高一尺，魔高一丈」，「安全防范」都是「防君子不防小人」。**要想使自己的网站时刻保持相对安全的状态，站长本身就应该是一名黑客。**

忽然想起有一本关于前端安全的书买了许久没看……

<figure>
  <img src="{{ 'posts/20160322/web-frontend-security.jpg' | asset_path }}" alt="《Web 前端黑客技术揭秘》">
  <figcaption>《Web 前端黑客技术揭秘》</figcaption>
</figure>

我一定会找时间把它看掉的！（这绝逼不是「死亡 flag」……ˊ_>ˋ）
