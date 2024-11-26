---
title: 使用github-pages部署hexo个人博客
description: 本篇博客，我将介绍如何使用github的pages服务来部署我们的hexo博客，借此来体验一下github的pages服务。
slug: github-pages-hexo-blog
date: 2023-11-01 16:43:12
tags: [hexo, 自建博客, github, 博客]
categories: 
- 技术分享
---

![image.png](https://s2.loli.net/2024/11/06/vakH3sZtxLrTbOW.png)

github有一个pages功能，可以将静态文件部署到自己的域名上，这样就可以免费白嫖一个自己的个人博客了。

<!-- more -->

github的pages功能只能托管静态资源，所以这里可以选择使用hexo来生成静态资源，然后将生成的静态资源部署到github的pages上。

## 软件安装
因为hexo是一个基于node.js的静态博客框架，所以需要先安装node.js。
并且由于要部署在github上，所以还需要安装git。

### 安装node.js
直接去nodejs[官网](https://nodejs.org/en)下载对应平台的安装文件，然后安装即可。
安装完成后，使用`node -v`和`npm -v`命令来查看是否安装成功。
```bash
$ node --version
v20.17.0

$ npm --version
10.9.0
```
### 安装git
去git的官网[下载](https://git-scm.com/downloads)安装即可。
安装完成后，使用`git --version`命令来查看是否安装成功。

```bash
$ git --version
git version 2.42.0
```

### 安装hexo
使用npm来安装hexo。

```bash
$ sudo npm install -g hexo-cli
```

这里使用了sudo来安装，是因为npm是一个全局的包管理器，所以需要使用sudo来安装，sudo安装需要输入密码。

安装完成后，使用`hexo -v`命令来查看是否安装成功。
```bash
$ hexo -v
hexo-cli: 6.4.2
```

## 创建hexo博客项目

### 初始化hexo项目
使用`hexo init`命令来初始化hexo。
```bash
$ hexo init myblog
```

初始化完成后，进入myblog目录。目录结构如下：

```bash
$ tree -L 1
.
├── _config.landscape.yml
├── _config.yml
├── node_modules
├── package.json
├── scaffolds
├── source
├── themes
└── yarn.lock
```

这里我们重点关注`source`目录，因为这是我们的博客内容所在的目录。


### 新建文章
使用`hexo new`命令来新建文章。
```bash
$ hexo new "My New Post"
```

新建完成后，进入`source/_posts`目录，会看到一个`My-New-Post.md`文件。这个文件就是我们新建的文章。
这是一个markdown文件，我们可以随便在里面写点东西，然后保存。

### 启动hexo
使用`hexo server`命令来启动hexo。
这将启动一个开发服务器，然后在浏览器中打开`http://localhost:4000/`即可看到我们的博客。

![image.png](https://s2.loli.net/2024/11/04/ZMPjt8HdeOBR4Kf.png)

### 生成静态文件
使用`hexo generate`命令来生成静态文件。
```bash
$ hexo generate
```
生成完成后，进入`public`目录，这个目录就是我们的静态文件所在的目录，里面包含了我们的博客的所有内容。

## 部署到github
### 创建github仓库
首先，我们需要在github上创建一个名为`username.github.io`的仓库。
其中username是你的github用户名。

![image.png](https://s2.loli.net/2024/11/04/NjkQqJ9Ga4erZ2B.png)

其余的留空就好。

### 配置hexo
进入`myblog`目录，然后编辑`_config.yml`文件。

在文件中找到`deploy`这一行，将其修改为如下内容：
```yaml
deploy:
  type: git
  repo: git@github-sj.com:coolcaosj/coolcaosj.github.io.git
  branch: gh-pages
```

这里的`repo`是我们的github仓库的地址，`branch`是我们的分支名。
ropo在创建完github仓库后，会自动生成并显示，或者也可以在仓库的设置中找到。

### 部署
使用`hexo deploy`命令来部署。
部署之前，需要先安装`hexo-deployer-git`插件。
```bash
$ npm install hexo-deployer-git --save
```

安装完成后，使用`hexo deploy`命令来部署。
部署时需要输入github的用户名和密码。因为这个步骤是将我们的静态文件推送到github的gh-pages分支上，所以需要输入github的用户名和密码来验证身份。

> 注意：
> 配置文件里 repo 使用https协议时需要每次部署时到输入用户名和密码，如果想部署时不再输入用户名和密码，可以使用git协议。
> 使用git协议时需要在本地生成ssh key，然后将ssh key添加到github的ssh keys中。
> 这个操作我会在后面的文章中详细介绍。


部署完成后，我们就可以通过 `username.github.io` 来访问我们的博客了。

### 备注
1. 现在github已不支持在推送代码时使用用户名和密码来进行验证，所以需要配置ssh key，然后将ssh key添加到github的ssh keys中。
2. 相应的，配置文件里的 repo 也需要使用git协议。
3. 我们配置的deploy的branch是gh-pages。这个项目起始推送的是编译后的可供访问的编译后的静态文件。
4. 如果博客的源码（即markdown）文件也许要在github上进行管理，那么可以将源码文件作为另一个项目也推送到github上。
