---
title: 在「MHC」我都做了什么？
date: 2019-05-21 23:55:48 +0800
categories:
  - life
tags:
  - frontend-engineer
  - job
  - maihaoche
banner:
  url: posts/20190521/banner.jpg
  description: 卖好车办公室
---

一般情况下，在谈论一家公司时所用的称呼是它的主打产品/品牌的名字，而非真正的注册名称。「MHC」就是我工作过的一家公司的主打产品/品牌的拼音「mai hao che」的首字母缩写。之所以不直接用汉字来指代，是因为在我任职期间它发生过转型——从自己卖车的「买好车」变成帮别人卖车的「卖好车」。

「MHC」的创始团队基本都来自淘宝，CEO 胡斐曾是蘑菇街 CMO，光看这点，这家创业公司会给人一种比较靠谱的感觉。在快 3 年的时间里，隔壁的公司一个接一个倒在了寒冬中，园区成了创业公司的坟场，而「MHC」依然顽强地活着，宛如一朵不惧寒风的花。这么来看，这家公司还真挺靠谱的。

## Hello, Dream Town.

2015 年 9 月，我离开了待了两年多却在各方面看不到任何希望的一家做在线教育的公司。找工作时面试的几家公司基本都给了 offer，综合考虑了薪酬待遇、发展空间和行业前景等因素，最终选择「MHC」。

到新公司报到与从上家公司离职只隔了一个周末。入职那天，我起得特别早。这天不仅是新工作的开始，也是我人生一个新阶段的开始，心情非常愉快、激动。

从住处走到文一西路上的「枫树湾河桥」公交站，和去阿里巴巴西溪园区上班的人挤同一辆公交车上班，别有一番感觉。连曾经被我嫌弃远在天边的仓前，现如今也觉得近在眼前。下车后，看到园区门口刻着「梦想小镇」四个字的大石头，不禁掏出手机拍张照片发到朋友圈：「梦想小镇，实现梦想的地方。」

<figure>
  <img src="{{ 'posts/20190521/dream-town' | asset_path }}" alt="梦想小镇">
  <figcaption>梦想小镇</figcaption>
</figure>

走进公司大门，经前台指引去办理手续，原来那天入职的不只我一个人。其中一个环节是取花名，因为创始团队大多来自淘宝，继承了阿里的花名文化也是理所当然。在没有准备的情况下，取花名对大部分人来说都是件头疼的事，我直接拿之前构思的小说主人公的名字作为自己的花名——欧雷。

各种填表签字之后，把背包放到工位，屁股还没坐热乎就被 leader 拉着整个大办公区里遛了一圈——「这是万剑」「这是拓爷（文拓）」「这是大表哥（阿鹏）」……把包括设计师和产品经理在内的研发部门的二、三十号人都认了个遍。回到工位再跟前端团队的其他人认识了一下，发觉比我面试时所得知的人数多了一个，算我 5 个人。

在用 Git 把代码拉下来，了解了正在使用的技术、开发方式和分支管理方式等信息之后，发现这里还挺落后的……与当时的主流差一截，并且有些不合理的地方。虽然使我震惊，但并未让我失望，心中反而燃起熊熊希望之火——我暗下决心，一定要改善现状！

## 初见「MHC」前端

### 神奇的 Git 仓库

我克隆的第一个 Git 仓库（以下简略为「仓库」）是一个神奇的仓库，因为它的名字和构成。

由于公司的业务是与汽车相关的，大部分仓库以汽车品牌来命名，个别非业务应用的以代表其功能的英文单词命名。而这个仓库的名字叫 `shanshan`，很明显不是一个汽车品牌，也不是一个功能性的语义化命名，而是人名或其他什么东西的名字的拼音。

在询问了 leader 之后才知道，他是这家公司的第二个前端工程师，在他之前还有一个花名叫「陕陕」的女前端工程师，`shanshan` 就是她以自己的花名拼音创建的。她是这里的第一个前端工程师，也是第一个女的前端工程师，后来回家休产假了。这位素未谋面的「第一女前端」曾在成立初期的蘑菇街工作过，也是那里的「第一女前端」。

一般来说，业务应用的仓库应该是「一个萝卜一个坑」，即一个仓库对应一个应用，无论前、后端的代码是否在一起。在这里，后端代码是按照这个规则来划分仓库的，可前端代码是把所有应用的都放到了 `shanshan` 这个仓库里，简直就是个「大杂烩」！

致使 `shanshan` 变得如此臃肿失控，大概是因为：

1. 采用了「前后端分离」的开发方式；
2. 野蛮生长期，不注重规范、工程问题；
3. 前端没什么话语权。

这个仓库存在的问题不仅如此：

- 第三方库都是从网上直接下载的，没有用 Bower、NPM 等进行依赖管理；
- 虽说引入了 Gulp 处理代码和文件，但样式的源码用的还是 CSS，而不是 Sass、LESS、Stylus 之类的预处理语言，也没有用 PostCSS 进行后处理；
- 分支管理混乱，这是整个技术部的通病；
- ……

虽然嘴上在吐槽，但心里是高兴的，这不就是让我施展拳脚的机会吗？那就愉快地决定拿它开刀了！

### 奇特的开发方式

这里采用了「前后端分离」的开发方式，但跟大家所理解的有所不同——

公司的后端语言是 Java，所使用的 web 框架是阿里巴巴自研的 [Webx](http://webx.github.io/){:target="_blank"}{:rel="nofollow external"}，相应的后端代码 Git 仓库中没有任何图片、CSS、JS 等静态资源文件，它们全部在 `shanshan` 这个神奇的仓库中。

在开发新功能时，需要在 IntelliJ IDEA 中通过 Tomcat 启动 Java 服务来查看页面和调用接口，页面中静态资源文件的 URL 全部为线上地址，即使文件不存在，再通过代理将线上地址映射到本地文件。当功能开发完成，就用 leader 写的一个基于 Node.js 的命令行工具把相关静态资源文件上传到[七牛](https://www.qiniu.com/){:target="_blank"}{:rel="nofollow external"}。这时，将映射文件的代理规则去掉或让后端工程师打开页面就能够正常访问了。

这个命令行工具没有将要上传的文件地址提取到配置文件中，而是直接写在脚本文件里，并且没有按指定规则过滤文件的功能，等要上传的文件一多，简直麻烦得不得了……

这种 HTML 代码写在 web 框架的后端模板中，单纯把静态资源文件分离出去的做法，在我看来既低效又毫无意义。

## 分享，为改造开路

由于 `shanshan` 这个仓库中已经存在大量文件，也就是所谓的「历史问题」，在目录结构方面不好做大的调整了，只好听之任之。但在分支管理和源码编写上，还是能够做些改变的。针对这两方面，我在入职没多久时的一次前端团队的周会上分享了前公司所使用的相对先进的思想、方法和工具。

### Git 分支管理

这里原有的分支管理方式是——

<blockquote>
  <p>每周有两个固定的发布日，在每个发布日之前某个管理发布的测试工程师（是的，我们没有运维工程师）会基于 <code>master</code> 分支创建前缀为 <code>pub_</code> 的发布分支，在发布之前会将要发布的内容都汇总在这个分支上进行测试，通过后再合并到 <code>master</code> 分支上进行发布。然而，发布完不会立刻将那个分支删掉，而是要保留几个星期以避免出问题。这样就会有好多过期的分支留在那里。</p>
  <p>有些不是立刻发布的内容，后端工程师们就会自己基于 <code>master</code> 分支创建出 <code>dev_</code> 为前缀的分支来开发新内容。</p>
  <footer>欧雷《<cite><a href="/posts/engineering-problems-of-frontend-development/" target="_blank">前端工程优化之路</a></cite>》</footer>
</blockquote>

这种方式的缺点主要有：

- 没有用于做线上 bug 修复的分支；
- 没有使用 Git 的标签功能做发布版本标记，从而残留大量冗余分支；
- 只有一个主要分支，查看历史版本信息不方便，并且稳定性略差。

这些缺点会导致多人协作时增加出错的几率和追踪代码历史的成本。

我上家公司在进行 Git 分支管理时采用了历经考验的更为成熟的「[Git Flow](http://nvie.com/posts/a-successful-git-branching-model/){:target="_blank"}{:rel="external nofollow"}」分支模型。它定义了 5 种分支，将职责更加细分：

| 分支 | 来源 | 说明 |
| --- | --- | --- |
| `master` | - | 用于存储正式发布的历史，每次发布都应该打上标签来标记已发布的版本 |
| `develop` | `master` | 集成了所有已开发完成的功能，包括尚未上线的 |
| `feature` | `develop` | 用于开发新的功能，开发并自测完要合并回 `develop` 分支 |
| `release` | `develop` | 囊括所有要发布的内容，不允许将不发布的功能包含在内，测试和修复 bug 都要在这个分支上进行，发布完需将代码合并到 `master` 分支并合并回 `develop` 分支 |
| `hotfix` | `master` | 用于修复线上 bug 做紧急发布，发布完需合并回 `master` 分支并合并到 `develop` 分支 |
{:.table.table-bordered}

小伙伴儿们在了解了这个分支模型能够轻松应对绝大部分复杂的多人协作场景的优势之后，纷纷表示可以先在团队内部试用一下。

### 样式源码编写

由于前公司所使用的 web 框架是 [Ruby on Rails](https://guides.rubyonrails.org/){:target="_blank"}{:rel="nofollow external"}（下文简称为「rails」），在做前端的技术选型时会优先考虑与其生态融合较好的，像用 [CoffeeScript](https://github.com/jashkenas/coffeescript){:target="_blank"}{:rel="nofollow external"} 写脚本，用 Sass 写样式。

CoffeeScript 和 Sass 的 `.sass` 用的都是缩进语法，不允许任何尖括号和花括号等让代码看起来很「脏」的符号，对于没有接触过 rails 生态的人来说较难适应。另外，CoffeeScript 对其他团队成员来说算是个新语言了，具有一定学习成本，并且业界的趋势是用 ES 新语法，故不打算引入 CoffeeScript。

Sass 有两套语法，除了缩进语法外，还有一套与 CSS 完全兼容的 SCSS 语法，其文件扩展名为 `.scss`。使用这套语法的话，可以先将 `.css` 无缝升级到 `.scss`，然后再慢慢享用 Sass 的变量、函数、mixin 和条件判断等特性带来的高效、便捷。

之所以选择 Sass 而不是 LESS 或 Stylus，还有个原因，就是在使用 Sass 上我已经有一些代码和经验的积累可以直接拿来用。

确定了「用什么去写」之后，决定「如何去写」是另一个重要的话题。

写样式时尽可能使用 `class` 替代 `id` 和标签已经是约定俗成的最佳实践。在做页面开发时，可以将一个页面看成是由 N 个相对独立的组件拼成的，从这点来看，没有什么命名法比「[BEM](http://bem.info/){:target="_blank"}{:rel="nofollow external"}」更适合命名 `class` 的了。在各个 BEM 的变体当中，个人认为「[SUIT CSS 命名方式](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md){:target="_blank"}{:rel="nofollow external"}」是可读性最好的。虽然使用 BEM 命名会使 `class` 变得比较长，但得益于 Sass 中的[父选择器 `&`](https://sass-lang.com/documentation/style-rules/parent-selector){:target="_blank"}{:rel="nofollow external"}，在开发时基本可以忽略这点。

经过讨论，一致决定样式源码使用 Sass 基于 SUIT CSS 命名方式去写并作为前端开发规范的一部分，这样会大大提高开发及协作效率。事后我将相关内容总结成文档沉淀到内网的 Confluence 上。

## 改造，从未停歇

### 团队用命令行工具

鉴于 `shanshan` 的臃肿程度和「前后端分离」的开发方式，要立刻改变是不大可能的，但我这种「懒」且「怕麻烦」的人实在是不想继续忍受每次把静态资源文件上传到 OSS 都需要反复手动修改路径等信息的日子了……同时，考虑到日后使团队的开发流程规范化，一个自研的团队内统一使用的命令行工具是必不可少的！

命令行工具的名字叫「[Bumblebee](https://www.npmjs.com/package/b3){:target="_blank"}{:rel="nofollow external"}」，由于单词中有 3 个「b」，故简称「b3」。起这个名字是因为当时喜欢最新款的科迈罗，在《变形金刚 4》里大黄蜂所变形成的车就是科迈罗，大黄蜂的英文名是「Bumblebee」。

它主要支持两个命令：`init` 和 `upload`——

`init` 命令从名字来看就知道是个跟「初始化」相关的。

现在来看，这个命令的职责不是那么「纯正」，因为会根据有无参数而在当前工作目录对不同的目标主体进行操作：无参数时生成命令行工具的配置文件，有参数则按照指定的脚手架生成目录文件。

该命令的脚手架功能并不是自己实现的，而是作为一个外壳集成了脚手架工具 [Yeoman](https://yeoman.io/){:target="_blank"}{:rel="nofollow external"} 的底层库 [`yeoman-environment`](https://github.com/yeoman/environment){:target="_blank"}{:rel="nofollow external"} 来利用已经存在的大量的 [Yeoman generator](https://yeoman.io/generators/){:target="_blank"}{:rel="nofollow external"}。并且，我们所使用的活动页模板也是基于 Yeoman 自己开发的一个 generator。

`upload` 命令用于将文件上传到 OSS 服务提供商，该命令是把 leader 写的上传文件脚本重构并优化、扩展而来。

与之前相比，具备了一个命令行工具该有的一些特性，如：初始化并生成配置文件；执行命令时传入选项以覆盖默认配置。更为重要的一个改进是，除了可以上传到七牛外，还能够备份到[顽兔](https://wantu.taobao.com){:target="_blank"}{:rel="nofollow external"}以备七牛挂掉时进行静态资源地址切换。

在后期的使用中，上传大量文件时会出现上传失败的情况。我猜是因为 OSS 服务提供商在短时间内接收到大量请求时做了限制，或者就是服务能力无法处理。后来我将上传文件的逻辑做了修改，把大批量的文件切分成 n 个「片段」以控制单位时间内的请求次数，粒度可以自定义，当一个「片段」中的文件全部上传完之后才会进行下一个。

### 推广 Git Flow

在前端小伙伴儿们基本都适应 Git Flow 这种 Git 分支管理方式时，我觉得是时候开始向整个技术部推广了。

随着开发人员的增多，因为并不是每个人都对 Git 使用熟练，在提交代码与合并分支时问题频出，突显出了 Git 及 Git Flow 培训的重要性。每每发现技术部在分支管理方面出现问题时，我就会在群里提一次 Git Flow 的事情。

看到我如此极力地推 Git Flow，有几次负责管理分支的既是测试又是运维的鱼蛋找到我，讨论 Git Flow 的场景应变能力，他应该也觉得用 Git Flow 会比现行方案强很多。

鱼蛋在进一步了解了相关知识后，挑了内网刚搭建好 GitLab 没几天的日子组织了一个分享会，向整个技术部普及 Git Flow 并讲解 GitLab 和 [SourceTree](https://www.sourcetreeapp.com){:target="_blank"}{:rel="external nofollow"} 的用法。为了让大家有文字参考，我写了份相关文档。

在分享会上，鱼蛋对照着我写的文档讲解了 Git 的一些常用操作，以及 Git Flow 的基本概念；我说明了如何用 SourceTree 结合 GitLab 实行 Git Flow，并讨论了到底该怎么去实施 Git Flow。

事后，我将文档完善了下，形成了《[团队中的 Git 实践](/posts/working-with-git-in-team/){:target="_blank"}》这篇文章。

经过几个月的实践，技术部对 Git Flow 的使用越来越规范，也越来越重视，甚至成为是否能够继续留在公司工作的衡量标准——新入职的人如果在培训后还搞不懂 Git Flow，将会被「升级」。

### 前端工程优化

2016 年上半年，公司的业务方向发生了巨大转变，从平行进口车电商平台变成服务于中小汽车经销商的卖车工具，宣传口号也由「全球好车随你挑！」变为「卖好车，车好卖！」。

业务变了，必然要开发新的应用来支撑。这是一个机会，一个彻底摆脱并告别 `shanshan` 和「前后端分离」的机会，让它们跟着「买好车」一起成为过去！

在做新的项目时，为了调试方便和模块化管理，我们决定将前、后端代码放到一个仓库中；为了提高编码效率和复用性，并能够让每个人都跟得上时代的步伐，采用 Sass 编写样式表，使用 ES6 编写脚本；考虑到不同环境中静态资源的地址不同，在发布时需要自动替换掉模板中的资源引用地址，于是选择了 [FIS3](https://fis.baidu.com){:target="_blank"}{:rel="external nofollow"} 作为构建工具。搭配上一些编码、文件等规范，感觉变得正规了不少！

在快一年的实践中，证明了这套方案可行，但还有些许不足——

针对基于 Java 框架的项目，FIS3 在 JS 的模块化方面支持得不是很好。虽说开发 FIS3 的团队做了一个名为 [`fis3-jello`](https://github.com/fex-team/fis3-jello){:target="_blank"}{:rel="external nofollow"} 的相关解决方案，但不太适合我们的项目。

页面中用的静态资源文件都是未经压缩的，整个页面的脚本文件都快以「m」为单位了，因为 Java 项目在部署时并未接入前端文件的构建流程。为了解决这个问题，我给团队用的命令行工具 `b3` 添加了 `publish` 命令，并结合 `upload` 命令将构建后的静态资源文件上传到 OSS。

问题解决是解决了，可因为各种原因没有集成进发布系统。

### 基础设施建设

2016 年下半年开始，公司业务迅速发展，人员大幅度扩充，系统应用也一下多了起来。在这种情况下，如果没有一些相对通用、稳定的基础设施，开发和维护成本将会很高，并且质量和稳定性无法得到保障——需要契合公司业务和开发方式的，能够快速搭建应用的前端框架。

#### MUU

在 2016 年 9 月，公司开展了仓储业务，这时需要开发一个仓储管理系统来管理已有仓库、车辆的入库和出库等信息。我是参与做这个系统的第一批成员之一，也是唯一的前端工程师。

在此之前已经有后台系统在用 [H-ui](http://www.h-ui.net/H-ui.admin.shtml){:target="_blank"}{:rel="external nofollow"} 等 UI 框架，但我没去继续使用而选择自研一套，主要原因如下：

1. 布局单一，缺乏灵活性、扩展性；
2. 提供了一些用不上的功能，臃肿；
3. 简陋。

表单页、列表页、详情页的组合是后台系统的固定模式，并且列表页基本都是由带有一个操作列的表格和指定条件筛选数据的表单组成。因为这是一个内部员工使用的后台系统，不需要十分注重用户体验，并且希望在一些场景下让后端工程师能够自己写页面，所以选择 [jQuery](https://code.jquery.com/){:target="_blank"}{:rel="external nofollow"}、[Bootstrap](https://getbootstrap.com/docs/3.3/){:target="_blank"}{:rel="external nofollow"} 和 [Bootstrap Table](https://github.com/wenzhixin/bootstrap-table){:target="_blank"}{:rel="external nofollow"} 作为核心，并辅以下面几个库来开发：

| 名称 | 说明 |
| --- | --- |
| [H5Fx](https://github.com/ourai/H5Fx){:target="_blank"}{:rel="external nofollow"} | 基于 [HTML5 Forms](https://www.w3.org/TR/html5/forms.html){:target="_blank"}{:rel="external nofollow"} 规范进行表单校验 |
| [Buds](https://github.com/ourai/buds){:target="_blank"}{:rel="nofollow external"} | 通用基础样式 |
| [Font Awesome](https://fontawesome.com/v4.7.0/){:target="_blank"}{:rel="nofollow external"} | 丰富的字体图标 |
| [Bootstrap 3 Date/Time Picker](http://eonasdan.github.io/bootstrap-datetimepicker/){:target="_blank"}{:rel="nofollow external"} | 精确到时分的日期时间拾取器 |
| [Select2](http://select2.github.io/){:target="_blank"}{:rel="nofollow external"} | 美化并增强下拉列表控件 |
| [HTML5 Shiv](https://github.com/aFarkas/html5shiv){:target="_blank"}{:rel="nofollow external"} | 兼容 HTML5 标签 |
| [Plupload](http://www.plupload.com/){:target="_blank"}{:rel="nofollow external"} | 上传文件 |
| [Qiniu SDK](https://github.com/qiniu/js-sdk){:target="_blank"}{:rel="nofollow external"} | 上传文件到七牛 |
| [Moment.js](http://momentjs.com/){:target="_blank"}{:rel="nofollow external"} | 日期时间格式化 |
{:.table.table-bordered}

由于没有设计师进行界面设计，起先在做的时候配色参考了自己博客的白、灰色调，效果大致如下图所示：

<figure>
  <img src="{{ 'posts/20190521/wms-theme-first-version' | asset_path }}" alt="第一版 UI 主题">
  <figcaption>第一版 UI 主题</figcaption>
</figure>

经过一段时间的使用，有人反馈页面太素，有些单调。恰逢公司刚发布新的 VI 规范不久，就使用其中规定的 LOGO 及扩展形式以及品牌色重新做了一版主题，令人觉得更加正式且有归属感。

<figure>
  <img src="{{ 'posts/20190521/muu' | asset_path }}" alt="遵守 VI 规范的新主题">
  <figcaption>遵守 VI 规范的新主题</figcaption>
</figure>

在业务需求的不断打磨之下，结合上面表格中列出的库，将做后台系统页面时经常用到的逻辑抽象成一个个简洁的工具方法。只需调用两三个工具方法并传入一些参数，就能够完成一套常规的增、删、改、查操作流程，有点前端基础的后端工程师都能够自己写页面了。

这些库加上从业务开发中提炼出的工具方法，组成了可以复用到其他后台系统开发中的 UI 框架——[Handie](https://github.com/ourai/handie){:target="_blank"}{:rel="nofollow external"}。

在 Handie 的基础上加入公司的品牌元素、业务逻辑等进行定制，形成了用于之后要开发的新的后台系统中的 UI 框架——「卖好车统一 UI 框架」，英文名为「Maihaoche Unified UI Framework」，简称「MUU」。

它的出现，为卖好车前端团队的基础设施建设开创先河，最终支撑了公司内部十余个后台系统的前端开发。

#### MUM

除了后台系统，还有几个嵌在 app 和钉钉中的[单页面应用](https://en.wikipedia.org/wiki/Single-page_application){:target="_blank"}{:rel="nofollow external"}（下文简称为「SPA」），它们基本都是用 [React](https://reactjs.org/){:target="_blank"}{:rel="nofollow external"} 和 [Ant Design Mobile](https://mobile.ant.design/){:target="_blank"}{:rel="nofollow external"} 开发的。这些前端应用也像之前的后台系统一样，各自是由零零散散的库拼凑而成，而没有一个统一的将其他库进行整合的能复用到各个应用中进行快速开发的框架。

一开始是想基于 MUU 的设计思想开发出一套用于 React 技术栈的解决方案，但如果同样是由我去弄，由于还得继续支持业务开发，同时还要维护并改进 MUU，没有时间和精力再去搞另外一个技术栈的解决方案。就算有时间和精力去搞，等我搞出个样子来的时候，SPA 所存在的问题应该已经扩大很多了，可能会到了无法挽救的地步。因此，我打算寻求帮手。

某天，我找前端团队中有移动端原生开发经验的两位童鞋（分别有 iOS 和 Android 开发经验）到会议室，跟他们说了我的想法，打算让他们一起根据当前 SPA 的状况封装一套 React 技术栈的移动端 web 前端框架。

之所以想找两个有原生开发经验的人，是因为想让他们去开发或推动 iOS 工程师、Android 工程师去开发符合移动端 web 要求和业务需求的 JS bridge，并提供无论在 app 中、钉钉中还是浏览器中都能够通过同一个 API 调用会产生相同或相似效果的 API。

我所想的框架大概是这样的：

<figure>
  <img src="{{ 'posts/20190521/architecture-of-mobile-framework' | asset_path }}" alt="移动端 web 前端框架">
  <figcaption>移动端 web 前端框架</figcaption>
</figure>

不知当时我有没有将想法构思表达清楚，他们都表示愿意去做这件事。在现有 SPA 的基础上经过一段时间的开发，框架的雏形已经出来了，它就是「卖好车统一移动端框架」，英文「Maihaoche Unified Mobile Framework」，简称「MUM」。

#### MUU 2.x

开发 MUU 的初心是想把业务开发中常见模式抽象出来，将常用库高度封装，提供一个通用、稳定的，让做业务开发的童鞋能够快速开发页面且低成本切换技术栈的前端框架。

<figure>
  <img src="{{ 'posts/20190521/architecture-of-muu' | asset_path }}" alt="理想中的 MUU">
  <figcaption>理想中的 MUU</figcaption>
</figure>

然而，受人员精力和项目时间的限制，只能先做出一版仅支持 jQuery 技术栈的解决方案（下文用「MUU 1.x」指代），并找人做了 MUM 这个 React 技术栈的解决方案。在我的整体构思当中，MUM 算是 MUU 的 React 技术栈解决方案的临时方案，为了避免进行无意义的重复劳动，MUM 需要融合 MUU 的设计思想加以改造。

在 MUU 1.x 相对稳定时，我暂时停止添加新的特性，转而开发「回归初心」的 MUU 2.x。

虽然想即刻跟开发 MUM 的童鞋沟通进行改造，但考虑到它已在 SPA 中深度使用，并且没有什么全面的改造方案，就暂且作罢。与此相反，有的 SPA 是用 Vue 开发的，仍处于「放养」状态，正需要被规整。

首先，按照上图中的构思从 MUU 1.x 中提取出通用的代码，拆分成基础核心和 jQuery 技术栈解决方案两个包；然后，新建个包引入基础核心中的 Sass helper、CSS class、JS 工具函数和适配器等，将它们进行一定程度的定制并重新导出；最后，利用 Vue 的插件机制将 JS 工具函数添加到 Vue 实例上，再用定制过的工具库封装一些单文件组件——一个 Vue 技术栈解决方案的骨架就出来了，剩下的就是在业务开发中不断地充实、完善。

在 MUU 2.x 中，其名字和英文全称也发生了变化——「卖好车<span style="text-decoration: line-through; font-style: italic;">统一</span>**通用** UI 框架」，英文名为「Maihaoche <span style="text-decoration: line-through; font-style: italic;">Unified</span>**Universal** UI Framework」。

#### 二方包仓库

从公司里前端工程师和客户端工程师的人员变化，以及业务开发的技术方案倾向可以看出，前端开发正在从颓势转为旺势，客户端工程师向前端团队归并的「大前端」形态是必然趋势。因此，可以预见接下来会有很多基础工具包、SPA 和 Node.js 应用，将会出现大量的 npm 包。把包含公司业务逻辑的代码发布到公共平台肯定是不被允许的，搭建一个运行在内网的私有 npm registry（下文称「二方包仓库」）势在必行。

二方包仓库运作的基本原理是：提供一个能够校验用户身份和权限的 npm 压缩包存储服务，利用可以对 npm 包的 scope 单独设置 registry 的机制，将约定的 scope 与该服务进行关联。这样一来，在 `npm install` 时输入的 npm 包名如果带有约定的 scope，就会从相关联的 npm 压缩包存储服务将 npm 压缩包下载到本地并解压到 `node_modules` 目录，否则会从 [npm 官方 registry](https://registry.npmjs.com/){:target="_blank"}{:rel="nofollow external"} 下载。

社区里已经有了几个能够搭建二方包仓库的开源项目，综合考虑了一下，觉得用 [cnpmjs.org](https://github.com/cnpm/cnpmjs.org){:target="_blank"}{:rel="nofollow external"} 比较靠谱。基于它搭建服务很简单，只需将代码克隆下来，修改下配置文件并部署到服务器就好了。

这下终于有二方包仓库了，可以快快乐乐、安安心心地发包了！激动得我立马把之前发布到 npm 官方 registry 的即使没包含公司业务逻辑代码但专门处理公司业务开发的包给废弃掉了。

## 管理视角初体验

随着前端团队人员越来越多，在像往常一样做一些开发工作的同时，也做了些管理工作。

### 团队目标

从 2017 年开始，每年年初我会梳理下当前技术部在做业务开发时存在的问题，挑选出那些能够以前端团队的方式解决的作为团队年度目标。有的只有特定的人能够胜任的我会直接找他聊，看他是否愿意去做，其他的就采用自领取的方式。如果有人想做已经分配出去的，就跟那个人一起做。像 MUU、MUM 就是年度目标的一部分。

### Confluence 团队空间

公司内部文档都是存放在内网的 Confluence 上，我建立了前端团队的空间并整理编写了大量文档，覆盖该空间总文档数量的 80% 以上，内容涵盖新人注意事项、开发规范、团队目标、常见问题解决方案等方面。

### GitLab 团队群组

在企业里做现代前端开发时，有两个私有服务是很重要的，一个是上文中所说的二方包仓库，另一个是 Git 仓库。

虽然公司已经搭建了内网的 GitLab，但前端工程师没有管理权限，想要建个仓库得找架构师拓爷或者测试兼运维鱼蛋。这在之前那种基本前后端代码都在一个仓库中的时期还好，但在 SPA 和 Node.js 应用开始铺开使用的情况下，前端团队需要争取 Git 仓库的自主管理权。

某天，我发现 GitLab 有个群组的特性，可以在一个群组中再建子群组，于是向拓爷申请创建一个前端团队专用的群组。我把原来在主群组中的和[公司 GitHub 组织](https://github.com/maihaoche){:target="_blank"}{:rel="nofollow external"}中的前端仓库能转移到前端团队群组的都转移了，然后按照基础设施和业务线再拆分子群组，并把业务线的前端负责人设置为业务线子群组的管理者。

为了支撑大量的 SPA 和 Node.js 应用开发所必需的两个服务已经齐备，前端团队的小伙伴儿们可以愉快地敲键盘了。

## To be continued...

本文着重介绍了在「MHC」时，除了日常的业务开发之外我都做了哪些事情。所列举的都是些对前端团队、对技术部、对公司业务或多或少有影响的事例，做到一半或做失败的事情也不太好意思拿出来说。

总的来说，在我入职前，前端团队乃至技术部主要存在的问题有：

- 工作方式不太科学；
- 前端工程问题严重；
- 基础设施几乎没有；
- 技术目标没听说过。

在职期间，我不做业务开发时就是去改善并解决这些问题，这是我在刚入职时给自己的定位，也是我认为自己存在于这里的意义。
