---
title: 基于cloudflare和sink构建属于自己的短链系统
slug: cloudflare-sink
tags: [cloudflare, 免费, 白嫖, 短链]
date: 2024-11-18 15:48:32
categories: 
- 技术分享
pinned: true
---

![](https://s2.loli.net/2024/11/18/GxQ2Vl8JqZu1O7N.png)

之前我们已经使用Cloudflare部署过自己的博客和图床工具， 本篇博客中，我们再部署一个短链系统sink。

<!-- more -->

## 什么是短链系统
短链系统（Short Link System）是一种通过将长URL转换为短链接的服务，使得用户可以更方便地分享链接，减少字符数量，提高链接的美观性和易读性。短链系统通常包括以下功能：

- URL缩短： 将长URL转换为短链接，通常是通过算法生成一串短码或自定义别名。
- 访问跟踪： 统计短链接的点击次数、访问来源等信息，帮助用户了解链接的流量情况。
- 自定义别名： 允许用户设置自定义的短链接别名，使得短链接更易记。
- 过期设置： 可以设置短链接的有效期，到期后链接失效。
- API支持： 提供API接口，方便开发者集成短链服务到自己的应用程序中。

sink是一个在github上开源的，可以部署到cloudflare pages的短链系统，这对于想拥有自己的短链系统人来说，是一个不错的选择。

## sink部署

### fork代码
首先需要将代码fork到自己的github帐号下。
sink的github仓库地址为： [https://github.com/ccbikai/sink](https://github.com/ccbikai/sink)

登录到自己的github帐号后，打开sink的github链接，然后点击fork按钮，将其fork到自己的帐号下。

### 部署到cloudflare pages
fork完成后，打开自己的cloudflare，然后创建pages。

![](https://s2.loli.net/2024/11/18/DkRCjeqdJGL2tS7.png)

连接到github后，选择刚才已fork的sink项目：

![](https://s2.loli.net/2024/11/18/H8tKDfyJ3sYAhU7.png)

然后进入设置页面。
这里框架预设选择Nuxt.js。
然后在环境变量下添加三个环境变量：
- NUXT_SITE_TOKEN： 必须超过8个字符。此令牌授予您访问仪表板的权限。
- NUXT_CF_ACCOUNT_ID: cf帐号id
- NUXT_CF_API_TOKEN: cf帐号api token

![](https://s2.loli.net/2024/11/18/3N95ancXiAy7ero.png)

> NUXT_CF_ACCOUNT_ID和NUXT_CF_API_TOKEN如何找？
> NUXT_CF_ACCOUNT_ID: 回到cloudflare首页，选择自己的网站域名，打开概述页面，在该页面的右下角部分会找到该id
> ![](https://s2.loli.net/2024/11/18/KfjkaTH48DyAZc3.png)
> 同样，NUXT_CF_API_TOKEN也是从该页面的获取您的api令牌创建。

设置完成后，点击部署，进入部署页面，等待几分钟即可部署完成。

部署完成后，再等待个两三分钟，即可打开链接查看页面了。

![](https://s2.loli.net/2024/11/18/z9WecLuA1jRMbCD.png)

首页大致如上所示。接下来我们做一些简单的设置，开启短链分析功能。

### 绑定KV
首先，我们进入cloudflare首页，点击 `workers & pages` 菜单下的 `KV` 选项：
![](https://s2.loli.net/2024/11/18/wTVu7OlWfJGMKbi.png)
这里我们创建一个新的KV命名空间，命名为`sink`即可。

然后返回刚才部署的sink项目，点击设置，并选择`绑定`，将刚才创建的KV绑定过来：

![](https://s2.loli.net/2024/11/18/zhlRJMpwE2kBfa4.png)

![](https://s2.loli.net/2024/11/18/FSam4qDvCunWf9j.png)

变量名称为`KV`，绑定的命名空间即为刚才创建的`sink`，然后点击保存。

### 开启分析引擎并绑定
回到cloudflare首页，点击`workers & pages`，然后在页面的右侧，有一个分析引擎的选项：
![](https://s2.loli.net/2024/11/18/Rmd1gTlLsip9xwQ.png)

在这里查看分析引擎是否已开启，如果没有开启，则先开启分析引擎。

开启分析引擎后，再次进入部署的项目，点击设置下的绑定选项，来进行分析引擎的绑定：

![](https://s2.loli.net/2024/11/18/A5pC8B7kP2TfhoR.png)

绑定一个分析引擎，名称为 `ANALYTICS`， 值为 `sink`，然后保存即可。

### 重新部署
绑定完KV和分析引擎后，我们就可以重新部署项目，以使绑定生效。

## sink基本使用
重新部署完成后，打开链接进入首页。
点击右上角的 Dashboard 进入管理后台页面。

![](https://s2.loli.net/2024/11/18/RV2q8mnIwN4uDGB.png)

这里的登录token就是我们在部署时设置的`NUXT_SITE_TOKEN`变量，输入即可进入管理后台。

![](https://s2.loli.net/2024/11/18/6xeop4EmvsXbHwW.png)

整个页面比较简洁，左上角的 `Links` 和 `Analysis` 标签分别是链接和分析两个功能标签页，点击可切换。

右上角这个`Create Link`按钮是创建短链的按钮。

下面这个区域是创建的短链的列表。

### 创建短链
我们先点击`Create Link`按钮来创建一个短链。
![](https://s2.loli.net/2024/11/18/dXbM5F9i1ZDNYSh.png)
url和slug是必填的，url就是要缩短的链接，slug是短链标识，可以自己填写，也可以让系统自动生成。
下面的Comment和Expiration是可选的备注和有效期，可填可不填，根据需要来定。

这里我们将sink项目的github地址填进去，会生成一个短链 [https://sink-demo.pages.dev/tnhw6q](https://sink-demo.pages.dev/tnhw6q)。

### 短链分析
在sink系统里生成的短链，我们可以点击 `Analysis` 标签页来查看其链接的分析功能。
![](https://s2.loli.net/2024/11/18/wQtR4AEJVF9mbxZ.png)
这个页面会分析出我们创建的短链被访问的次数，以及访问者的ip，国家，设备，系统等等几本信息，可以有助于我们对在业务中对数据进行调优。

## 自定义域名
由于我们部署完后，使用的是cloudflare提供的二级域名，在观感上也不是很短，如果你有自己的域名，可以将其绑定到项目。

![](https://s2.loli.net/2024/11/18/zXxk7AdGpseugJR.png)
进入部署的项目，点击`自定义域`，然后在这里设置自定义域名即可，设置完成后就可以通过自己的域名来访问sink系统了。
