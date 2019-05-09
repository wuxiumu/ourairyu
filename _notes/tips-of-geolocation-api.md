---
title: 地理位置 API 排错
categories:
  - web-development
tags:
  - web-api
---

在浏览器中如果需要获取用户的地理位置信息，通过 `navigator.geolocation.getCurrentPosition()` 可以实现。然而，在使用这个 API 时浏览器对其有所限制——访问环境必须是安全的。只有当访问的网页是 HTTPS 或者本地环境时，浏览器才会认为是安全的。

虽然达到使用 API 的条件了，但也不代表一定会调用成功，这也就是真正要注意的地方——

为了能够很好地排查问题，最好传入 API 的第二个参数，并且打印出错误信息。

{% highlight js %}
navigator.geolocation.getCurrentPosition(function( pos ) {
  // ...
}, function( err ) {
  console.warn('在获取地理位置时出现问题：', err);
});
{% endhighlight %}

如果在 Chrome 的控制台中输出的错误信息里看到 `Network location provider at 'https://www.googleapis.com/' : No response received.`，意味着所处网络环境在访问 `https://www.googleapis.com/` 时出现了问题。如果没有断网，看到「google」这个字眼，就知道是众所周知的原因了。更为深层的原因是因为 Chrome 在返回地理位置信息之前需要远程调用 Google API。解决方案就是，要么弄个梯子，要么换个浏览器。

换了 Safari 或 Firefox 后如果看到 `User denied Geolocation`，那就要检查下电脑的定位服务是否开启并已经给浏览器授权。masOS 需要到「系统偏好设置」的「安全与隐私」中「隐私」那里找到「定位服务」。

<figure>
  <img src="{{ 'notes/tips-of-geolocation-api/macos-system-preferences' | asset_path }}" alt="系统偏好设置">
  <figcaption>「定位服务」设置</figcaption>
</figure>

