---
layout: article
title: php 读取数据中文乱码解决方案
categories:
  - Back-end
tags:
  - PHP
  - 乱码
  - 存取
  - 数据库
  - 编码
comments: true
---

最近这些天我每天都在弄博客模板，在今天终于弄得差不多了，于是想转移视线放松一下我这紧张疲劳的大脑——弄个动画的进度记录！

做这个功能的话，每部动画 N 多集，我看 N 多部动画，所以想要把数据都写在 php 文件里是不可能的，这样就得需要操作数据库。可以这么说，我在数据库这方面就是个小白菜，基本不懂，只知道那么几个基础概念：数据库、表、记录、记录集等以及会一点简单的SQL。

我认为看多少理论知识也是白搭，还不如动手做，遇到问题就解决，这样倒学得更快！不过没想到刚写了不几行代码就遇到问题了——从数据库中取出来的数据显示到页面上之后是乱码（中文汉字变成了英文问号）！明明数据库和php文件的编码都是 UTF-8 的，想不通为什么！问了几个人，在网上找了半天也没找到确切的解决办法，最后终于还是在「[搜搜问问——PHP读取MYSQL数据时出现乱码怎么办?](http://wenwen.soso.com/z/q104200853.htm)」找到了解决方案，下面就结合我的代码记录下来：

```php
  // 建立一个连接
  $con = @mysql_connect('127.0.0.1', 'root', '')
  or die('Counld not connect to mysql server!');

  // 设置编码
  mysql_query("SET NAMES utf8");
  mysql_query("SET CHARACTER SET utf8");
  mysql_query("SET COLLATION_CONNECTION='utf8_general_ci'");

  // 获取数据
  if(mysql_select_db('wp_database', $con)) {
    $result = mysql_query('SELECT * FROM wp_users WHERE ID=1');
    $result = mysql_fetch_object($result);
    echo 'The result is: ';
    print_r($result);
  }
  else {
    die(mysql_error());
  }

```
