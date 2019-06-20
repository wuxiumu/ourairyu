---
title: 微信小程序开发
categories:
  - web-development
tags:
  - wechat-miniprogram
---

## 渲染性能

由于微信小程序天生的资源瓶颈，稍不留意就会造成性能问题，真可谓是「寸土寸金」啊。于是，在开发时要时时刻刻注意不要同时占用较多的计算资源。大概需要注意以下几点：

* 使用数量和层次最少的标签完成设计稿；
* 避免过多的遍历操作；
* 与页面渲染无关的数据不进行 `this.setData()`；
* 同时发出的数据请求数最好不要超过 2 个；
* 数据接口不要返回前端用不上的字段；
* 首次渲染时列表类模块尽量不要渲染超过一屏半的部分。

## 生成图片

为了让店铺或商品能够在朋友圈中扩散，并且由于微信官方没有提供将微信小程序分享到朋友圈的功能，常见的玩法就是生成带有能够直接跳转到店铺或商品的小程序码的图片。如果图片要在前端生成，不可避免要用到 `<canvas>`。

不像标准 HTML 中的 `<canvas>`，在微信小程序中使用时必须加上 `canvas-id` 属性作为唯一标识符。

{% highlight html %}
<canvas canvas-id="magicalCanvas"></canvas>
{% endhighlight %}

然后在 JS 代码中创建 canvas 上下文：

{% highlight js %}
const ctx = wx.createCanvasContext('magicalCanvas'/*, this*/);  // 在自定义组件中需要传入 `this` 作为第二个参数
{% endhighlight %}

在一顿猛如虎的操作之后，必然需要将画好的图生成可以保存的图片：

{% highlight js %}
ctx.draw(false, () => {
  setTimeout(() => {
    ctx.canvasToTempFilePath({
      canvasId: 'magicalCanvas',
      x: 0,
      y: 0,
      width: CANVAS_WIDTH,                      // 与 `<canvas>` 的 `width` 相同
      height: CANVAS_HEIGHT,                    // 与 `<canvas>` 的 `height` 相同
      destWidth: CANVAS_WIDTH * DEST_RATIO,     // 把生成的图片放大几倍避免有锯齿
      destHeight: CANVAS_HEIGHT * DEST_RATIO,
      success: ({ tempFilePath }) => {
        wx.saveImageToPhotosAlbum({             // 保存图片到本地相册
          filePath: tempFilePath
        });
      }
    }/*, this*/);                               // 在自定义组件中需要传入 `this` 作为第二个参数
  }, 300);                                      // 放在 `setTimeout()` 中避免渲染未完成而造成的颜色等问题
});
{% endhighlight %}

跳转到店铺或商品的小程序码一般是后端生成后传到 OSS 上，所以在执行 `ctx.draw()` 之前需要先将小程序码图片下载下来并画到画布上：

{% highlight js %}
wx.downloadFile({
  url: QR_CODE_URL,
  success: ({ tempFilePath }) => {
    ctx.drawImage(tempFilePath);
    ctx.draw();
  }
});
{% endhighlight %}

**千万要记得在微信公众平台上配置「downloadFile合法域名」，否则执行 [`wx.downloadFile()`](https://developers.weixin.qq.com/miniprogram/dev/api/wx.downloadFile.html){:target="_blank"}{:rel="external nofollow"} 会失败！**
