---
title: 前后端分离之设想
date: 2016-08-12 00:14:34 +0800
categories:
  - web-development
tags:
  - software-engineering
  - web-architecture
  - decoupling-frontend-from-backend
  - node
  - maihaoche
banner:
  url: drafts/blueprint-of-decoupling-web-architecture-with-node/banner.jpg
  description: Node.js
series: build-a-frontend-team
---

关于「前后端分离」，这个概念已经出来好几年了，国内外有很多公司和产品采取了这种方式。这是一种在我看来较为先进的开发方式，它改变的不仅仅是一个 web 应用的系统架构，还有 web 工程师之间的协作方式，对「前端工程师」这个职业的发展产生了很大的影响。

我所理解的「前后端分离」，在之前写的文章中有提到——

<blockquote>
  <p>「前端」和「后端」并不应该用设备、平台来划分，而应以关注点和职责来划分——与人机交互及数据展现相关的都算是「前端」，即 Controller 层和 View 层；与业务逻辑及数据存储相关的都算是「后端」，即 Model 层。</p>
  <footer>欧雷《<cite><a href="/posts/working-with-node-in-team/">团队中的 Node.js 实践</a></cite>》</footer>
</blockquote>

如果这种划分方式真的成为主流，如今的「前端工程师」将会脱胎换骨，成为类似于客户端工程师的存在。至于为什么不是成为「客户端工程师」的一个细分职业，是因为网页毕竟不是直接运行在操作系统上，而是在其他的应用软件当中。

## 为什么要变

我们想做前后端分离的原因有很多，但这毕竟是前端团队发起的，要想在整个开发团队中推动并获得后端开发人员乃至上级的认同，必须得举着「大义」的旗帜。

### 应变迟钝

作为一家电商行业的互联网公司，活动相关的需求总是源源不断的。虽然已经有个叫做「简易活动模板」的能够让运营童鞋自己动手创建活动页的系统，但设计师的思维是活跃的，不一定什么时候脑子突然「噼咔噼咔」一下就想出了一堆「好玩儿」的点子，设计出单凭那「简易」的模板系统已经无法满足的页面。这时，就得人肉切图了。

<figure>
  <img src="{{ 'drafts/blueprint-of-decoupling-web-architecture-with-node/new-idea' | asset_path }}" alt="灵光乍现">
  <figcaption>灵光乍现</figcaption>
</figure>

切图没关系，切就切呗！只要不考虑 SEO 问题，祭出我们前端的绝技「三刀切大法」，三下五除二就切好一个页面。然而，现在很多活动页是内嵌在 APP 中的，需要读取一些后端数据，这就要有后端开发人员进行配合了。两个人吭哧吭哧好不容易联调结束，走一遍 Git Flow 流程将代码合并进 master 分支后让后端开发人员通过发布系统部署到线上。

没过多久，也许是几分钟，没准是几小时，有可能是几天，运营童鞋悄悄地来到身边静静地蹲下，很有礼貌地开口了：「＊＊需要小小地调整一下，这个地方没多少改动，应该很快能改好（上线）吧？」可是，他们所得到的回复基本是：「这个得跟今天晚上的发布一起上线。」在听到这句话后，我能想象得出他们的表情——

<figure>
  <img src="{{ 'drafts/blueprint-of-decoupling-web-architecture-with-node/petrified' | asset_path }}" alt="呆若木鸡">
  <figcaption>呆若木鸡</figcaption>
</figure>

运营童鞋肯定会在心里咆哮：「改这么点东西也要等那么久？！公司养你们这些人是干什么吃的？！」

### 职责不清

每次接到新的需求后，在做页面时都会出现类似的问题——

后端模板要谁来写呢？如果是后端去套用前端写的静态页面，他们 HTML 肯定写得不规范，到时出现任何问题还得跑来问前端；但若是前端去写，不知道数据输出后具体是什么样子，到时还得后端去把文本部分替换成变量，也可能会导致样式崩溃，并且还需要他们去配置访问页面的 URL 与模板关联。

当前端对跟他配合的后端说：「＊＊，你帮我把 URL 加一下。」后端童鞋不明所以，一脸懵逼：「啊？」前端有点无奈：「访问页面的 URL 啊，你不配置一下我怎么调试？」后端的反射弧突然变得有点狭长，停顿了几秒钟才从他嘴里冒出：「哦……」

<figure>
  <img src="{{ 'drafts/blueprint-of-decoupling-web-architecture-with-node/angry' | asset_path }}" alt="无语至极">
  <figcaption>无语至极</figcaption>
</figure>

我想，大部分 web 开发人员都会遇到这些问题。仅仅是做个页面而已，却要跟后端开发来来回回交涉好多次。这种沟通完全没必要，真是浪费口水，浪费时间，浪费心情！

### 业务耦合

### 脱离团队

## 要变成啥样

### 淘宝的「中途岛」

* [模板 & 路由共享](http://blog.jobbole.com/65534/){:target="_blank"}{:rel="external nofollow"}
* [ModelProxy](http://blog.jobbole.com/65541/){:target="_blank"}{:rel="external nofollow"}
* [Nginx + Node.js + Java 部署实践](http://blog.jobbole.com/71675/){:target="_blank"}{:rel="external nofollow"}

## 有哪些阻碍

## 解决的方案

### 需要解决的问题

* 数据接口开发
    * 设计
        * [RAML](http://raml.org){:target="_blank"}{:rel="external nofollow"}
        * [API Blueprint](https://apiblueprint.org){:target="_blank"}{:rel="external nofollow"}
    * 开发
        * [JSON Schema](http://json-schema.org){:target="_blank"}{:rel="external nofollow"}
        * [Mock.js](http://mockjs.com){:target="_blank"}{:rel="external nofollow"}
        * [Swagger](http://swagger.io){:target="_blank"}{:rel="external nofollow"} / [RAP](http://rapapi.net/){:target="_blank"}{:rel="external nofollow"}
* 生成假数据
* 无缝切流量
    * Nginx 配置文件引入
* 旧页面迁移
* 接口环境切换
    * 设置 cookie
* 部署发布策略
* 日志监控报警
