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

## 实施

### 需要解决的问题

* 数据接口开发
    * 设计
        * [RAML](http://raml.org){:target="_blank"}{:rel="external nofollow"}
        * [API Blueprint](https://apiblueprint.org){:target="_blank"}{:rel="external nofollow"}
    * 开发
        * [JSON Schema](http://json-schema.org){:target="_blank"}{:rel="external nofollow"}
        * [Mock.js](http://mockjs.com){:target="_blank"}{:rel="external nofollow"}
        * [Swagger](http://swagger.io){:target="_blank"}{:rel="external nofollow"}
* 生成假数据
* 无缝切流量
    * Nginx 配置文件引入
* 旧页面迁移
* 接口环境切换
* 部署发布策略
* 日志监控报警

### 淘宝的「中途岛」

* [模板 & 路由共享](http://blog.jobbole.com/65534/){:target="_blank"}{:rel="external nofollow"}
* [ModelProxy](http://blog.jobbole.com/65541/){:target="_blank"}{:rel="external nofollow"}
* [Nginx + Node.js + Java 部署实践](http://blog.jobbole.com/71675/){:target="_blank"}{:rel="external nofollow"}
