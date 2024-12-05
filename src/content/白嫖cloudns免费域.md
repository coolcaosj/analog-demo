---
title: 白嫖cloudns免费域名
slug: free-domain-cloudns
description: cloudns 是一家 DNS 托管服务商，官方网站是 [https://www.cloudns.net/](https://www.cloudns.net/)。其免费账号可以创建一个免费域，虽然是二级域名，但胜在免费且无时间限制，比较适合个人使用。
tags: [白嫖, 免费, 域名]
categories: [技术分享]
date: 2024-12-05 15:46:20
pinned: true
---

![](https://s2.loli.net/2024/12/05/IvfbsM8YpH2gOan.png)

cloudns 是一家 DNS 托管服务商，官方网站是 [https://www.cloudns.net/](https://www.cloudns.net/)。
其免费账号可以创建一个免费域，虽然是二级域名，但胜在免费且无时间限制，比较适合个人使用。

<!-- more -->

## Cloudns 账号注册

首先打开其官网链接 [https://www.cloudns.net/](https://www.cloudns.net/)。
![](https://s2.loli.net/2024/12/05/6Ie2UCt5wcXBfFA.png)
选择免费账号进行注册。
![](https://s2.loli.net/2024/12/05/FT8bdWG3rkos9gR.png)
`First and last name`是账号名，使用两个单词，中间用空格。
`Email`是邮箱，用于接收激活邮件用。
`Password`是账号密码，最好是复杂的。
填完后，选中 `I agree to the Terms of Service`，然后点击 `Sign up` 进行注册。

此时，会给你填写的邮箱发送一个激活链接，打开邮箱点击链接进行激活即可。
激活成功后，会自动登录到 cloudns 的首页。

## 创建免费域

![](https://s2.loli.net/2024/12/05/lieKz1aVHXx8ZJ6.png)

登录首页后，大致如上截图。

点击 `Create Zone` 按钮进行创建免费域，在弹出的框中选择最后一个 `Free Zone` 来创建免费域。
![](https://s2.loli.net/2024/12/05/uOj1yfSTAhLr6CU.png)

![](https://s2.loli.net/2024/12/05/y8AEQoGBlM1jWcw.png)
Domain name 的第一个输入框是自己要定义的域，第二个是其提供的二级域名的后缀，cloudns 总共会提供 4 个二级域名，分别是 `.ip-ddns.com`, `.ddns-ip.net`，`.ip-dynamic.org` 和 `.cloud-ip.biz` ，选择一个自己喜欢的即可。

> ⚠️ 注意 ⚠️：
> 创建免费域时，需要使用节点，虽然国内 ip 可以直接访问 cloudns，但却创建不了免费域，会提示 ip 乱用。
> 这里建议直接使用美国的节点，一定会成功

创建成功后会直接跳转到管理页面：
![](https://s2.loli.net/2024/12/05/xv8D9HZCJFAgi6m.png)

上面 `**.ip-ddns.com` 是刚才创建的域名，下面是该域名的 NS 记录。

## 托管到 cloudflare

虽然 cloudns 提供了域名解析服务，但为了方便我们在 cloudflare 上使用 pages 和 workers， 我们最好还是将其托管到 cloudflare 上。

首先登录 cloudflare，然后点击 `添加域`。
![](https://s2.loli.net/2024/12/05/9bSzrCxNHvuF2nW.png)

然后输入刚才在 cloudns 上创建的域名，点击 `继续`.
![](https://s2.loli.net/2024/12/05/4hRVIDLOpZQo5rx.png)

![](https://s2.loli.net/2024/12/05/iXNUxzlgoe7vEC3.png)
然后 cloudflare 会给出两个 ns 服务器，将其复制到 cloudns 上。

![](https://s2.loli.net/2024/12/05/N1zyRwXhBscfKqx.png)
如上，type 选择 NS， Points To 将复制 ns 服务器地址填上即可。

然后将其他默认的记录全部删除，只留下从 cloudflare 复制过来的两个 ns 记录即可。
![](https://s2.loli.net/2024/12/05/OWACXTxpmJj2gbV.png)

然后返回 cloudflare，点击继续。
因为涉及到两个网络服务更改 DNS 设置，所以可能需要一段时间的等待其生效即可。等待个大概 5 到 10 分钟即可。

回到 cloudflare，刷新一下页面，如果看到我们新添加的域名为`活动`状态，说明已经添加成功。
![](https://s2.loli.net/2024/12/05/VUKZPXBcvY3y7uC.png)

## 总结

总的来说，白嫖 cloudns 的免费域过程还是很顺利的，不需要人工审核，全过程自动完成。只需要在注册时注意要挂美国 ip 的节点即可。
