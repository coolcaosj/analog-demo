---
title: 使用cloudflare搭建免费的vless服务
description: cloudflare真的是一个宝藏服务，之前我们已经搭建过个人博客，免费图床，短链系统等等基于pages的免费服务，今天我们使用其来部署自己的vless服务，体验一下cloudflare的强大。
slug: cloudflare-vless
tags: [免费,白嫖,cloudflare,vless]
categories: 
- 技术分享
date: 2024-11-28 09:46:58
---

![](https://s2.loli.net/2024/11/28/JBnSvu9Y7lgK1Oh.png)

cloudflare真的是一个宝藏服务，之前我们已经搭建过个人博客，免费图床，短链系统等等基于pages的免费服务，今天我们使用其来部署自己的vless服务，体验一下cloudflare的强大。

<!-- more -->

## fork源码

将[github上的项目](https://github.com/seramo/ed-tunnel)fork到自己的github仓库。


## 部署到cloudflare

登录cloudflare，然后点击 `Workers & Pages` 服务，进入页面。
创建Pages服务，然后点击 `连接到git` 按钮。
然后选择刚才fork到自己账户的ed-tunnel项目，然后点击开始设置按钮，进入设置页面。

![](https://s2.loli.net/2024/11/28/TnLEbWC1XK3eyOP.png)

然后在接下来的设置页面，其他不需要关注，只需要设置环境变量，添加一个 `UUID` 的环境变量即可。

![](https://s2.loli.net/2024/11/28/48Oz5uVymd9iPCS.png)

设置完成后，点击 `Deploy` 按钮即可部署到cloudflare上。

部署完成后，会得到具体的链接。

过一会后，打开链接能看到页面就说明部署成功了。

## 获取vless链接

打开 `****.pages.dev/uuid` 即可获取到具体的vless链接，这里的 `uuid` 就是上面设置的环境变量的值。

然后将链接复制到vless客户端即可。
