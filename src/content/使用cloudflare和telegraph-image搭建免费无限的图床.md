---
title: 使用cloudflare和telegraph-image搭建免费无限的图床
slug: cloudflare-telegraph-image
date: 2023-11-06 14:20:40
tags: [cloudflare, 图床, 白嫖, 免费, telegraph-image]
category: 
- 技术分享
---

![image.png](https://s2.loli.net/2024/11/06/w4fYq3JTIVDesu1.png)

我们在写博客时，经常会遇到需要图片的情况，但又不想花钱去购买图床服务，网上倒是存在一些免费的图床工具，但又怕这些工具后期会出问题，导致图片无法访问。
因此，我就想着自己搭建一个图床，这样就可以保证图片的稳定性，同时也可以免费使用。
在{% post_link 使用cloudflare配置个人博客 使用cloudflare配置个人博客  %}这篇博客中我们使用cloudflare部署了自己的基于hexo的静态博客，这篇博客我们就来使用cloudflare和telegraph-image来搭建一个免费的图床。

<!-- more -->

Telegraph-Image是一个开源的免费图片托管解决方案，Flickr/imgur 替代品。使用 Cloudflare Pages 和 Telegraph。
[github地址](https://github.com/cf-pages/Telegraph-Image)

- 1.无限图片储存数量，你可以上传不限数量的图片
- 2.无需购买服务器，托管于 Cloudflare 的网络上，当使用量不超过 Cloudflare 的免费额度时，完全免费
- 3.无需购买域名，可以使用 Cloudflare Pages 提供的*.pages.dev的免费二级域名，同时也支持绑定自定义域名
- 4.支持图片审查 API，可根据需要开启，开启后不良图片将自动屏蔽，不再加载
- 5.支持后台图片管理，可以对上传的图片进行在线预览，添加白名单，黑名单等操作

## 部署步骤
### fork项目到自己的github账户
首先登录自己的github，然后fork项目到自己的github账户。因为部署过程需要连接自己的github账户，和之前部署hexo博客一样。


### 部署到cloudflare
登录cloudflare，然后点击 `Workers & Pages` 服务，进入页面。
创建Pages服务，然后点击 `连接到git` 按钮。
然后选择刚才fork到自己账户的Telegraph-Image项目，然后点击开始设置按钮，进入设置页面。

![image.png](https://s2.loli.net/2024/11/06/pxEXdBzPMcnFka3.png)

然后设置完项目名称，点击保存并部署按钮，开始部署。

部署完成后，就可以直接打开链接，来访问我们的图床了。

![image.png](https://s2.loli.net/2024/11/06/Oqh3eEQFGicvPdI.png)

### 开启图片管理
项目自带了一个后台管理页面，我们可以通过这个页面来管理我们的图片。
默认是关闭的，需要手动开启， 并且需要做一些配置。

#### 创建KV命名空间
点击左侧菜单的 `Workers & Pages` 下的 `KV` 选项，然后点击创建命名空间按钮。然后点击创建命名空间按钮。
![image.png](https://s2.loli.net/2024/11/06/pnPzLjCmJbqkQRd.png)

这里名称可以随意，但建议使用 `img_url` 作为命名空间名称，方便识别。

#### 绑定KV命名空间
![image.png](https://s2.loli.net/2024/11/06/WCfNYHLIdkAc3PZ.png)
在`Workers & Pages` 页面选择刚部署的项目，进入项目页面。
然后依次点击`设置` -> `绑定` -> `添加`，弹出绑定页面。

![image.png](https://s2.loli.net/2024/11/06/AdKhypuIJ5QvcTY.png)
![image.png](https://s2.loli.net/2024/11/06/Lhl9Ax71ISFJjzW.png)
选择`KV命名空间`，然后输入变量名称 `img_url`，注意这里变量名称一定是 `img_url`，然后选择刚才创建的KV命名空间。
然后点击保存按钮。
#### 设置后台管理登录用户名和密码
![image.png](https://s2.loli.net/2024/11/06/YVRtcGBOi2puons.png)
在设置页面，选择`变量和机密`，然后点击添加。
![image.png](https://s2.loli.net/2024/11/06/B5ahFpwQOnqfR4K.png)
添加两个环境变量：

|变量名称	|值|
|----|----|
|BASIC_USER	|<后台管理页面登录用户名称>|
|BASIC_PASS	|<后台管理页面登录用户密码>|

#### 重新部署
![image.png](https://s2.loli.net/2024/11/06/Ki7f4HwUN6thaFR.png)
点击部署，然后点击`查看详细信息`进入到部署的详细信息页面。

![image.png](https://s2.loli.net/2024/11/06/aSEAN9u2ezmo68B.png)

然后点击 `管理部署` -> `重试部署` 即可重新部署项目。

#### 访问后台管理页面
部署完成后，可以通过链接后面加上 `/admin` 来访问后台管理页面。
![image.png](https://s2.loli.net/2024/11/06/jqPMWg1Jf9No5yr.png)

输入刚才设置的用户名和密码，就可以登录后台管理页面了。


## 总结
通过以上步骤，我们就得到了一个具有管理后台的免费图床。

但毕竟是白嫖的免费cloudflare，所以还是有一定限制的：
- Cloudflare KV 每天只有 1000 次的免费写入额度，每有一张新的图片加载都会占用该写入额度，如果超过该额度，图片管理后台将无法记录新加载的图片
- 每天最多 100,000 次免费读取操作，图片每加载一次都会占用该额度（在没有缓存的情况下，如果你的域名在 Cloudflare 开启了缓存，当缓存未命中时才会占用该额度），超过黑白名单等功能可能会失效
- 每天最多 1,000 次免费删除操作，每有一条图片记录都会占用该额度，超过将无法删除图片记录
- 每天最多 1,000 次免费列出操作，每打开或刷新一次后台/admin 都会占用该额度，超过将进行后台图片管理
- 绝大多数情况下，该免费额度都基本够用，并且可以稍微超出一点，不是已超出就立马停用，且每项额度单独计算，某项操作超出免费额度后只会停用该项操作，不影响其他的功能，即即便我的免费写入额度用完了，我的读写功能不受影响，图片能够正常加载，只是不能在图片管理后台看到新的图片了。
- 如果你的免费额度不够用，可以自行向 Cloudflare 购买 Cloudflare Workers 的付费版本，每月$5 起步，按量收费，没有上述额度限制
