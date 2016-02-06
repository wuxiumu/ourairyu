---
title: 前端工程优化之路
date: 2016-02-04 16:35:36 +0800
categories:
  - web-development
tags:
  - frontend-web-development
  - software-engineering
  - frontend-engineering
  - maihaoche
---

在我加入「[买好车][mhc-url]{:target="_blank"}{:rel="nofollow external"}」后第一次把项目代码从远程仓库 `pull` 到本地时——「这是什么玩意？！」——我的内心是震惊并诧异的。

为什么我会有如此反应？

「[买好车][mhc-url]{:target="_blank"}{:rel="nofollow external"}」是一家具有阿里基因的公司，创始人和员工很多来自阿里。众所周知，阿里的技术是很不错的，基本每年都会主办一些技术会议，有些技术书籍也是阿里人著作或翻译的。因此，心理上会对他们在技术方面有较高的预期。然而，呈现在眼前的现实将我从幻想中拉了出来……

[mhc-url]: https://www.maihaoche.com

## 代码维护

不像大部分团队那样前后端代码放在一起维护，我们的项目代码是分开管理、维护的，即前后端代码不在同一个 Git 仓库当中。前端代码只有一个仓库，存放了公用资源、活动页、主站等不同业务线的代码，每个项目是一个目录；后端代码以项目为单位分为几个不同的仓库存放。部署上线也是分开进行。

这种做法美其名曰「前后端分离」，实际到底是不是，值得思考。

## Git 的使用

团队在使用 Git 时主要存在两方面问题：分支管理策略和代码提交准则。

### 分支管理策略

每次打开 SourceTree，首先映入眼帘的就是五颜六色的「彩虹线」——

![提交记录图表]({{ "posts/20160204/git-graph.png" | asset_path }}){:style="max-width: 284px;"}

和好些过期的分支——

{% highlight text %}
.
└─┬─ origin
  ├─── dev_frontend
  ├─── dev_general
  ├─── dev_inquiry
  ├─── dev_maiche
  ├─── pub_20160111
  ├─── pub_20160112
  ├─── pub_20160113
  ├─── pub_20160114
  ├─── pub_20160128
  ├─── pub_20160202
  └─── ...
{% endhighlight %}

看得我简直是头晕目眩，不知从何「编」起啊！

造成这种情况的最直接的原因就是，没有一个好的分支管理策略。这里的分支管理策略是这样的：

每周有两个固定的发布日，在每个发布日之前某个管理发布的测试工程师（是的，我们没有运维工程师）会基于 `master` 分支创建前缀为 `pub_` 的发布分支，在发布之前会将要发布的内容都汇总在这个分支上进行测试，通过后再合并到 `master` 分支上进行发布。然而，发布完不会立刻将那个分支删掉，而是要保留几个星期以避免出问题。这样就会像上图中那样有好多过期的分支留在那里。

有些不是立刻发布的内容，后端工程师们就会自己基于 `master` 分支创建出 `dev_` 为前缀的分支来开发新内容。

虽然他们在创建分支时都是有一定的规则，但这种做法产生了一些「垃圾」分支，以及使 `master` 分支看起来不那么稳定，像定时炸弹一样随时会「嘭」！

我觉得团队中应该采用 Git Flow 来管理分支，这是一个不知经过多少团队验证的分支模型，我有信心它能够应对我们团队所遇到的各种场景。

### 代码提交准则

我们团队的 Git 提交记录很「简单」，要么写着几个简单的字母或词语，要么就是合并分支时生成的节点，一眼望去根本不知道那些人到底做了什么。这如果是想查找某个功能点的更改记录，得逐个节点去分析。

在使用 Git 时应该遵守一个基本原则——使提交记录尽可能简洁详细，看它就像读一本书。要达到这种效果，只需牢记几点：

* 控制 `commit` 粒度；
* 填好 `commit` 信息；
* 调节 `push` 频率；
* 多 `rebase` 少 `merge`。

要使每个 `commit` 都具有意义，粒度最好控制为一个小 feature 或者一个 bug fix，这样进行 `revert` 之类操作时能够将「误伤」减到最低。

一个好的 `commit` 信息是，用一句简练的话写在第一行，然后空一行略微详细地阐述该提交所增加或修改的地方：

{% highlight text %}
Redirect user to the requested page after login

https://trello.com/path/to/relevant/card

Users were being redirected to the home page after login, which is less
useful than redirecting to the page they had originally requested before
being redirected to the login form.

* Store requested path in a session variable
* Redirect to the stored location after successfully logging in the user
{% endhighlight %}

不要每 `commit` 一次就 `push` 一次，多积攒几个 `commit` 后一次性 `push`，这样可以避免前一个 `commit` 后发现代码中还有小错误，这时可以通过 `rebase` 进行 `commit` 的合并或者信息修改。

为了保持图表清晰和代码完整性，要掌握好 `commit` 和 `push` 操作的时机——

还没有 `push` 到远程仓库时，如无必要则只 `commit` 不要 `push`，只在需要与他人配合开发时再 `push`。当所在分支已经完成职责时，需将父级分支的代码 `rebase` 到当前分支（得先保证父级分支在本地是最新的），然后合并至父级分支并删除当前分支。理想情况是，**这个分支的整个生命周期没有进行过一次 `push` 操作**。

当已经 `push` 到远程仓库时，先积累几个 `commit` 的内容而不去做 `commit` 操作，等到要 `push` 时先 `pull` 代码到本地，然后按照上述粒度做几次 `commit`，再 `push` 到远程服务器。这种操作流程能够有效避免因代码冲突而造成的 `commit` 丢失等意想不到的问题，以及减少因 `merge` 产生的 `commit` 节点。

![合并分支产生的节点]({{ "posts/20160204/git-merge.png" | asset_path }}){:style="max-width: 280px;"}

### 扩展阅读

* [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/){:target="_blank"}{:rel="nofollow external"}
* [5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message){:target="_blank"}{:rel="nofollow external"}
* [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/){:target="_blank"}{:rel="nofollow external"}

## 前端工程

与整个技术团队相比，前端团队中所存在的问题更多更为严重！基本可以概括为以下几点：

* Git 仓库混杂了很多不同的业务；
* 源代码复用性低；
* 没有合理使用构建工具；
* 静态资源文件的发布流程繁琐；
* 活动页面的编写方式麻烦，并且对搜索引擎不友好。

我作为一名前端工程师，虽然暂时无法去对整个技术团队做些什么，但是作为前端团队的一员，却可以在前端团队中做些力所能及的事情。在我看来，「有问题」就代表着「机遇」，该是我大展拳脚的时候了！想起来都觉得肾上腺素大量分泌，热血沸腾！

那么，我该做些什么呢？

我所想到的能够提高前端团队工作效率和生产力的手段有：

1. 制定编码及文件存放等的规范和约定；
2. 选择高效的语言编写源码；
3. 选择合适的自动化工具；
4. 保证以上几条顺利执行的措施。

为了提高前端团队的整体素质和实力，需要做的事情还有很多。想要完成这些不是一朝一夕的事情，前端工程优化之路任重而道远啊……

想在已有的项目上进行改造会存在着很大的阻力，幸好这时公司业务拓展要开发新项目。决定从这新的项目着手，小试牛刀，总结出一套方案后推行整改到其他项目。

以本文为引，往后会写几篇关于我们前端团队建设的文章，敬请期待！
