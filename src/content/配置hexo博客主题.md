---
title: 配置hexo博客主题
description: 之前我们已经成功的搭建了一个hexo博客，但是这个博客的主题还是默认的，我们可以通过修改主题来美化我们的博客。
slug: hexo-themes
date: 2023-11-05 17:06:06
tags: [hexo, 博客, 自建博客]
categories:
- 技术分享
---

![1.png](https://s2.loli.net/2024/11/06/wTS1ftYQU4LpEBa.png)

在{% post_link 使用github-pages部署hexo个人博客 github pages部署hexo个人博客  %}这篇博客中，我们已经成功的搭建了一个hexo博客，但是这个博客的主题还是默认的，我们可以通过修改主题来美化我们的博客。

<!--more-->

## 主题选择
我们可以在hexo官网的[主题列表](https://hexo.io/themes/)中选择自己喜欢的主题，也可以使用搜索引擎搜索一些推荐度比较高的主题，这些主题一般都是开源的，都能从github上下载到其源码。

这里我的博客使用的是[next](https://github.com/theme-next/hexo-theme-next)主题。其自带四个子主题，界面大致如下：

![2.png](https://s2.loli.net/2024/11/06/GDdRQXV4efE5jP6.png)

## 主题安装
主题的安装比较简单，只需要将主题的源码下载到我们的博客的themes文件夹中即可。

```shell
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

然后修改我们的 `_config.yml` 文件，将 `theme` 的值修改为 `next` 即可。

```yaml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next
```

当我们修改完配置文件后，我们需要重新生成我们的博客，然后我们就可以看到我们的博客已经使用了next主题了。

## 主题配置
当主题安装完成后，我们可以通过修改主题的配置文件来配置我们的博客，做一些定制化的东西。

这里我安装的是next主题，需要修改的文件是 `themes/next/_config.yml` 文件。

### 修改子主题
直接修改 `themes/next/_config.yml` 下的 `scheme` 字段即可，这里我使用的是 `Mist` 子主题。

```yaml
# ---------------------------------------------------------------
# Scheme Settings
# ---------------------------------------------------------------

# Schemes
#scheme: Muse
scheme: Mist
#scheme: Pisces
#scheme: Gemini
```

### 菜单修改
hexo默认支持几个菜单，在主题中可以配置其是否开启。这里我开启了如下几个菜单：

```yaml
menu:
  home: / || fa fa-home
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  about: /about/ || fa fa-user
```

其中，`home` 菜单是首页，`tags` 菜单是标签页，`categories` 菜单是分类页，`archives` 菜单是归档页，`about` 菜单是关于页。

配置完菜单后，除了home页和archives页，其他的菜单点击时会报404，找不到页面，那是因为我们还没有创建这些页面。

在source目录下建立对应的目录，并在目录下创建 `index.md` 文件，得到如下目录结构：

```shell
source
├── _posts
├── about
│   └── index.md
├── categories
│   └── index.md
└── tags
    └── index.md
```

1. about
  ```md
  ---
  title: 关于本站
  date: 2024-10-01 11:48:24
  comments: false
  ---
   你好，欢迎来到我的博客
  ```
2. categories
  ```md
  ---
  title: categories
  date: 2024-10-01 11:27:10
  type: "categories"
  comments: false
  ---
  ```
3. tags
  ```md
  ---
  title: tags
  date: 2024-10-01 11:23:17
  type: "tags"
  comments: false
  ---
  ```

当修改完配置，并生成对应的目录和文件后，我们就可以在菜单中点击对应的菜单，跳转到相应的页面了。
不用担心上面几个页面简单的内容，hexo都给我们生成好了对应页面的内容。
此时可以点击相应的菜单来查看对应页面的具体效果。

### 侧边菜单配置
侧边菜单需要修改的文件是 `themes/next/_config.yml` 下的 `sidebar` 字段。

```yaml
sidebar:
  # Sidebar Position.
  #position: left
  position: right

  # Manual define the sidebar width. If commented, will be default for:
  # Muse | Mist: 320
  # Pisces | Gemini: 240
  #width: 300

  # Sidebar Display (only for Muse | Mist), available values:
  #  - post    expand on posts automatically. Default.
  #  - always  expand for all pages automatically.
  #  - hide    expand only when click on the sidebar toggle icon.
  #  - remove  totally remove sidebar including sidebar toggle.
  display: always
```

比如这里我将 `position` 的值修改为 `right`，则侧边菜单会显示在右边。
`display`设置为 `always`，则侧边菜单会一直显示。
其他字段可以根据需要，自己进行尝试修改，找到自己喜欢的配置。

### 头像配置
头像配置需要修改的文件是 `themes/next/_config.yml` 下的 `avatar` 字段。

## 部署发布
当修改完主题配置后，我们就可以将我们的博客部署到github pages上了。

每个主题的具体细节配置，可能不一样，可以参考主题的文档进行配置。

