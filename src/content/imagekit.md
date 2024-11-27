---
title: 可以白嫖的图床工具
slug: imagekit
description: 对于互联网从业者来说，图床可以说是一个非常重要的工具。比如写博客时需要图床来存储图片，又比如做文案时需要图床来存储图片链接。之前教大家用 cloudflare 和 telegraph-image 搭建了一个免费的图床，但由于 cloudflare 是国外的网络服务商，在国内访问有时候可能不稳定，本篇博文再教大家白嫖另外一个工具。
tags: [免费, 白嫖, 图床, imagekit]
date: 2024-11-27 09:31:00
categories:
- 技术分享
---

![](https://s2.loli.net/2024/11/27/GAH9uL2XeDPqI4i.png)

对于互联网从业者来说，图床可以说是一个非常重要的工具。比如写博客时需要图床来存储图片，又比如做文案时需要图床来存储图片链接。
之前教大家用 cloudflare 和 telegraph-image 搭建了一个免费的图床，但由于 cloudflare 是国外的网络服务商，在国内访问有时候可能不稳定，本篇博文再教大家白嫖另外一个工具。

<!-- more -->

## imagekit

imagekit 是一个媒体存储，处理服务商。其官方网站是[官方网站](https://imagekit.io/)。在国内网络可以直接访问。

### 免费额度

其提供了一定的免费额度，个人用户而言，使用不是很频繁的情况下，免费额度已经够用了。
它的服务类型分为两种：`Complete Media Processing` 和 `Only DAM`。
这两者的区别是`Complete Media Processing`可以对媒体文件进行实时处理，包括所有媒体优化、转换和流媒体功能，以及提供了 API 服务，可供开发者自行开发应用，而`Only DAM`是只提供媒体文件的存储服务，不提供任何媒体优化、转换和流媒体功能，也不提供 API 服务，但是可以用于 CDN 加速，可以用于图床等应用。

但`Complete Media Processing`由于提供的功能更多更强大，所以此类型的免费额度存储空间只有 5GB，而`Only DAM`的免费额度存储空间为 25GB。

所以如果对于一般用户而言，只是想将其作为一个图床工具，那么注册时选择`Only DAM`就可以了，这样就可以将其作为一个免费的图床工具使用了。

## 注册使用

### 注册

两种类型的服务，一定要在注册时进行选择，选择后注册完毕不能进行更改。
![](https://s2.loli.net/2024/11/27/dK7Vbr89EH4lhQq.png)

选择DAM后直接点击 `Get Started` 进入注册页面，然后进行注册即可。

注册完毕后登录进入Dashboard页面，在左侧菜单栏可以看到自己账户所支持的功能：

![](https://s2.loli.net/2024/11/27/18g53inWCxqT2fD.png)

图床工具，选择 `Media Library` 即可进入到图库，这里就是自己的所有上传的图片资源。

![](https://s2.loli.net/2024/11/27/BwiUONEeku9c25S.png)


### 上传图片

点击右上角的`New`按钮即可上传新的图片，然后选择图片文件，上传即可。

![](https://s2.loli.net/2024/11/27/2sCGIVbSMlH67LE.png)

上传完成后可以鼠标右键图片，然后选择`Copy URL`即可复制图片的链接，这个链接是图片的直链，可以直接使用。

![](https://s2.loli.net/2024/11/27/nTHRgQswNFOASMl.png)

### 使用客户端
上面我们是在浏览器上的web页面里上传图片的，imagekit官方也提供了一个客户端，客户端用起来比web端稍方便些。

> 但是吐嘈一下，imagekit的客户端在其官网上找不到下载链接，其下载链接是在文档中找到的，这一点真的是，非常傻叉。

客户端下载链接为 [https://imagekit.io/docs/dam/app](https://imagekit.io/docs/dam/app)。

![](https://s2.loli.net/2024/11/27/nhPsyNEb4gLaYI6.png)

支持mac和windows平台。

以mac为例，下载完成后，打开会在状态栏上有一个图标，点击图标即可打开上传文件页面。

![](https://s2.loli.net/2024/11/27/fE8VtsbQDKYkqgB.png)

点击New即可上传图片，这里比较好的一点是，使用快捷键`cmd+v`可以直接将剪贴板中的图片粘贴进来，上传即可。

上传完成后返回到图片列表，可以直接复制图片链接使用。

## 总结
imagekit是一个不错的图床工具，有免费额度可以白嫖，其免费额度对于一般人来说也够用了，而且其网络环境相对于国内用户也比较友好，可以说对于想免费白嫖图床的同学来说是一个不错的选择。
