---
title: 在 Mac OS X 中搭建 Apache + PHP + MySQL 开发环境
date: 2015-07-20 23:54:00 +0800
categories:
  - 网络开发
tags:
  - Apache
  - Mac OS
  - MySQL
  - PHP
  - 开发环境
---
我所使用的操作系统是 Mac OS X Yosemite，自带 Apache 和 PHP，所以不用安装，只需稍微修改一下配置文件即可。

## 启动 Apache

打开终端，输入 `sudo apachectl start` 后即可启动 Apache。访问 `http://localhost/` 会看到 `It works!` 字样。

## 启用 PHP

修改 `/etc/apache2/httpd.conf` 文件的配置，将 `#LoadModule php5_module libexec/apache2/libphp5.so` 前面的 `#` 去掉后，在终端中输入 `sudo apachectl restart` 重启 Apache 后 PHP 就能够正常使用了！

不过，用默认的目录开发很是不方便，还好可以自定义工作目录。同样是在 `/etc/apache2/httpd.conf` 文件中，将 `DocumentRoot "/Library/WebServer/Documents"` 和 `<Directory "/Library/WebServer/Documents">` 中引号内的路径改为自己的路径即可。新建一个 `index.php` 文件，代码为 `<?php phpinfo(); ?>`，用浏览器访问 `http://localhost/` 就能够看到结果。

## 安装 MySQL

参考 <http://www.piaoyi.org/php/568.html>

