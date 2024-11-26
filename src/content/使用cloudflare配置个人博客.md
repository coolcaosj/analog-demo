---
title: 使用cloudflare配置个人博客
description: 本篇博客，我将介绍如何使用cloudflare的pages服务来部署我们的hexo博客，借此来体验一下cloudflare的pages服务。
slug: cloudflare-blog
date: 2023-11-06 10:41:19
tags: [cloudflare, 自建博客, 博客]
categories:
- 技术分享
---

![image.png](https://s2.loli.net/2024/11/06/j6z3hixufLqtK87.png)

Cloudflare是一个全球知名的网络服务提供商，它提供了一系列的网络服务，用户可以免费注册，并拥有一定的免费额度可以使用。
其中 `Workers & Pages` 就可以为我们提供免费的网络托管服务，可以部署静态资源以及动态的workers服务。

在{% post_link 使用github-pages部署hexo个人博客 github pages部署hexo个人博客  %}这篇博客中，我们使用github pages部署了hexo生成的静态博客，但是github pages服务只能部署静态资源，不能部署一些动态服务，如果需要部署一些更灵活的动态服务，我们可以选用cloudflare的pages服务。

<!-- more -->

本篇博客，我将介绍如何使用cloudflare的pages服务来部署我们的hexo博客，借此来体验一下cloudflare的pages服务。

## 注册cloudflare账户
首先我们需要注册一个cloudflare帐号，可以从[cloudflare官网](https://www.cloudflare.com/)注册。
可以使用邮箱注册或者直接使用谷歌帐号登录也可。
注册完成后直接登录，就可以看到如下界面：

![image.png](https://s2.loli.net/2024/11/06/tugV4O5GeE93m2L.png)

## 部署pages

左侧目录是cloudflare为我们提供的具体服务分类，我们本次要使用的是 `Workers 和 Pages` 服务，点击进入。

![image.png](https://s2.loli.net/2024/11/06/fqRp6yZ7sFiNWIt.png)

点击创建按钮，进入创建页面。

![image.png](https://s2.loli.net/2024/11/06/azyNAjF8SH2bZ1Q.png)

这里我们选择 `Pages` 服务，来创建Pages服务。然后点击 `连接到git` 按钮。

![image.png](https://s2.loli.net/2024/11/06/81QBumFG75ctRUJ.png)

cloudflare支持github和gitlab，这里我们选择github，连接到github。

如果之前没有连接过github会先进入连接github页面进行授权，授权完成后，会列出github帐号以及github下的仓库。

![image.png](https://s2.loli.net/2024/11/06/81QBumFG75ctRUJ.png)

在{% post_link 使用github-pages部署hexo个人博客 github pages部署hexo个人博客  %}这篇博客中我们创建了一个名为 `username.github.io` 的仓库，用来部署我们的github pages博客，这个仓库起始就是hexo生成的静态博客，这里我们只需要将其连接过来，选择这个项目即可。

选择项目后，点击开始设置按钮，进入设置页面。

![image.png](https://s2.loli.net/2024/11/06/UXgwroOIivNmYSK.png)

这里设置项目的基本信息，最重要的就是项目名称了，这个名称，就是我们部署完成后访问二级域名的前缀，所以这里最好设置一个简短，对自己有明确意义的名称。

其余的保持默认即可。然后点击保存并部署按钮，开始部署，然后等待部署完成即可。

![image.png](https://s2.loli.net/2024/11/06/a8NH4wPOWXSEyVf.png)

当看到如上的界面时，就说明部署成功了。我们可以点击页面中的链接，来访问我们的博客了。

> 初次部署，可能会有一些延迟，如果链接打不开，可以等待几分钟再试。

## 后话
本篇博客中，我们使用cloudflare的pages服务来部署我们的hexo博客，体验了一下cloudflare的pages服务。
但实际上，cloudflare的pages服务的能力不仅仅是部署静态博客，还可以部署一些动态服务，比如自己用代码实现的一些动态服务，或者github上搜索的一些基于cloudflare的服务，后面有机会我会找一些有意思的项目来介绍并部署一下。
