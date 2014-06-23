---
layout: page
layout_type: sandwich

page_category: about

title: 关于
description: 说说我与本站的故事
permalink: /about/
comments: true
---

## {{ site.data.author.name.zh }}
{:.heading}

![欧雷](http://0.gravatar.com/avatar/0565b1df14e0b4a1a9cdecb3f085cdba?s=250 "欧雷"){:.avatar}一个目前人在{{ site.data.author.location }}，主要从事 web 前端开发的 web developer。在进行开发时注重语义化、复用性等，依赖 HTML5 标签构建网页结构，使用 CSS3 美化页面，遵从「渐进渐强」（progressive enhancement）原则，通过 Sass 和 CoffeeScript 来编写样式及脚本代码。**更多地了解我的能力？请检阅我的[技能表]({{ site.data.url.skill }})。**:-)

关于我是如何跳进「web 前端开发」这个坑的，那要从我的数据癖说起——

2006 年左右，那时我是一名高中生，并且正痴迷于某日本偶像团体。因我有数据癖，并且正好有个可以编辑 HTML 的网站，于是我就利用它整理我所搜集来的资料，把数据写到 `<table>` 里。那时我不知 HTML 为何物，亦不懂如何利用它。正好有个网友好像当时是从事 web 开发方面的工作，他给了我一个 HTML 简易教程的网址，并告诉我那时已经开始流行 DIV + CSS 了。当时我连 HTML 是什么都不知道，更别说 CSS 了！显然听不懂他说的是什么……这是我初次接触 HTML，之后就在心中留下了「世上还有这么便利的东西？！」的印象。

三年后，也就是 2009 年，我在实习。忘了起因是什么，我开始使用 blog 了。那段时间换了好多服务商，因为在找能够自己定制页面的。和讯、网易、新浪都用过，时间都很短。在找到百度空间后，发现能够自己写 CSS，我记得好像也只能写 CSS，HTML 不能自定义。这是我首次接触 CSS。为了能够写出自己满意的样子，到处找教程自学。刚开始只能做出在 IE7 下面显示正常的页面，换个浏览器就发现错位等一系列问题。当时不知道这是什么原因，慢慢也就知道原来还存在「浏览器兼容」这种问题！经过一段时间折腾，对这种**轻轻松松就能看到代码效果并且容易操作掌控**的感觉所吸引，渐渐喜欢上了做网页！

2010 年面临离校找真正的工作，我想都没想就要从事与网页制作相关的工作！那时我没听过「前端工程师」这个职业，更不知道做这个职业会赚多少钱，选择它完全是凭我对其的兴趣！找工作之前我一点 JavaScript 都不会，虽然学习它是在我的计划之中，但是面试时肯定得问与其相关的问题，所以在面试前两天我买了书临时抱佛脚，总算知道了些东西。

虽然目前工作的主要内容仍是 web 前端开发，但我将自己定位为 web developer——不拘泥于「前」或「后」，甚至希望能够成为通晓产品、设计等方面的人。

前方之路还很漫长，静心、耐心、全心地向着目标迈进！;-)

### 参与会议

<ul class="confs">
  {% for conf in site.data.conferences reversed %}
    <li class="conf">
      <h4 class="conf_name">{% if conf.website == blank %}{{ conf.name.zh }}{% else %}<a href="{{ conf.website }}" target="_blank" rel="external nofollow">{{ conf.name.zh }}</a>{% endif %}</h4>
      {% assign start_date = conf.period.start | date: "%Y.%m.%d" %}
      {% assign end_date = conf.period.end | date: "%Y.%m.%d" %}
      <div class="conf_period"><time datetime="{{ conf.period.start | date: '%Y-%m-%d' }}">{{ start_date }}</time>{% if start_date != end_date %} – <time datetime="{{ conf.period.end | date: '%Y-%m-%d' }}">{{ end_date }}</time>{% endif %}</div>
      {% if conf.description != blank %}
        <p class="conf_desc">{{ conf.description }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>

## {{ site.data.info.title.zh }}
{:.heading}

> 「道」是表达技术、方法、学术观点、方法论或思想体系的「普遍概念」。

「{{ site.data.info.title.zh }}」即指「深入研究 web 开发技术并归纳总结，将其形成一个完整的思想体系」——Dive into Web！

本站页面 footer 的版权信息中的起始时间是第一篇文章的发表时间，并非建站时间。

### 2014 年

#### 年初

将技术类文章从[主站]({{ site.data.author.website.url}} "{{ site.data.author.website.name }}"){:target="_blank"}{:rel="external nofollow"}分离出来传到 [GitHub](https://github.com/ourai){:target="_blank"}{:rel="external nofollow"} 上。

#### 四月末

用一个星期时间对网站进行重新设计并编码，采用 [Jekyll](http://jekyllrb.com/ "Jekyll"){:target="_blank"}{:rel="external nofollow"}、[Disqus](http://disqus.com/ "Disqus"){:target="_blank"}{:rel="external nofollow"} 等技术和服务，于四月的最后一天完成！
