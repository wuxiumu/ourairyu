---
title: 用 Git Hooks 进行自动部署
date: 2015-10-10 01:29:38 +0800
categories:
  - web-development
tags:
  - git
  - deployment
  - web-server
  - linux
refs:
  - https://argcv.com/articles/2078.c
  - https://dearb.me/archive/2015-03-30/automate-deploy-your-websites-with-git-hook/
---
昨天开始接手开发公司前端团队的主页，在稍微修改点东西后推送到远程仓库想看下线上结果时发现并没有更改！询问一把手得知，居然还需要连接到服务器执行一下 `git pull` 才行……对于我这种怕麻烦的人来说，简直不能忍！

经过一番查找资料以及一顿折腾，终于让它能够自动跑起来了，真是高兴得我手舞足蹈啊！

虽然弄了较长时间，在实践的过程中踩了点坑，但回过头来一看还是挺简单的。总的来说，我们需要在服务器和本机都做一下配置（这不废话么……）——

## 服务器

### 创建仓库

服务器上需要配置两个 git 仓库，一个用于代码版本管理的远程仓库，一个用于用户访问的本地仓库。**这里的「远程仓库」并不等同于托管代码的「中央仓库」**，这两个仓库都是为了自动同步代码并部署网站而存在。

在存放远程仓库的目录中（假设是 `/home/ourai/repos`）执行 `git init --bare bridge.git` 会创建一个包含 git 各种配置文件的「裸仓库」。

切换到存放用户所访问文件的目录（假设为 `/home/ourai/www`，如果不存在则在 `/home/ourai` 中执行 `mkdir www`）：

{% highlight sh %}
git init
git remote add origin ~/repos/bridge.git
git fetch
git checkout master
{% endhighlight %}

### 配置 Git Hook

将目录切换至 `bridge.git/hooks`，用 `cp post-receive.sample post-receive` 拷贝并用 `vim post-receive` 修改。其内容大致如下：

{% highlight sh %}
#!/bin/sh

unset GIT_DIR

NowPath=`pwd`
DeployPath="../../www"

cd $DeployPath
git pull origin master

cd $NowPath
exit 0
{% endhighlight %}

使用 `chmod +x post-receive` 改变一下权限后，服务器端的配置就基本完成了。

## 本机

在原有的（托管代码的）仓库上加入刚才所配置的服务器上的远程仓库的地址为源，以后往那个源推送代码后就会自动部署了。
