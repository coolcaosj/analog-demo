---
title: asciinema
description: asciinema是一个开源的终端录屏软件，它可以让我们在终端中录制和分享我们的操作，并且可以将录制的内容导出为文本文件或者视频文件。这对于我们在终端中进行的操作进行记录和分享非常有用，比如我们在终端中进行一些操作，然后想分享给别人，但是又不想让别人看到我们的操作，那么就可以使用asciinema来录制我们的操作，然后将录制的内容导出为文本文件或者视频文件，然后将文本文件或者视频文件分享给别人。
slug: asciinema
tags: [终端工具, 录屏, asciinema, 软件, 免费软件, 终端录制, 开源]
date: 2023-11-07 11:27:32
categories:
- 软件推荐
---

![](https://s2.loli.net/2024/11/07/vWlBgunUxhe2H7Q.png)

asciinema是一个开源的终端录屏软件，它可以让我们在终端中录制和分享我们的操作，并且可以将录制的内容导出为文本文件或者视频文件。
这对于我们在终端中进行的操作进行记录和分享非常有用，比如我们在终端中进行一些操作，然后想分享给别人，但是又不想让别人看到我们的操作，那么就可以使用asciinema来录制我们的操作，然后将录制的内容导出为文本文件或者视频文件，然后将文本文件或者视频文件分享给别人。

<!-- more -->

## 下载安装

asciinema的下载可以在其[官网](https://docs.asciinema.org/)根据文档进行安装。
不同的系统有不同的安装方式，这里我以Mac系统为例进行安装，其他系统可以参照官方文档进行安装。

Mac系统使用homebrew进行安装：
```bash
brew install asciinema
```

安装完成后，可以通过命令`asciinema --version`来查看是否安装成功。如果安装成功，会显示asciinema的版本号。

![](https://s2.loli.net/2024/11/07/wY4uJUFL9kl5NZg.png)

## 终端录屏

asciinema的使用非常简单，只需要在终端中输入`asciinema rec demo.cast`命令即可开始录屏，然后按照提示进行操作，操作完成后，按下`Ctrl + D`即可停止录屏。

录制的内容会保存为`demo.cast`文件，这个文件可以通过asciinema的命令`asciinema play demo.cast`来播放。

或者使用官方的web播放器`asciinema-player`集成到网页中进行播放。

下面就是一个使用asciinema-player播放的示例：(点击▶️开始播放)

<asciinema-player src="/resources/cast/demo.cast" preload="ture"   poster="npt:0:30"></asciinema-player>

## 分享上传

asciinema的录屏内容可以通过asciinema的官方网站进行分享和上传，也可以通过asciinema的命令`asciinema upload demo.cast`来上传。

但这里不建议上传到asciinema的官方网站，因为录制的内容可能包含个人隐私数据，如果只是想分享给别人，可以导出gif图片然后将图片分享给特定的人即可。

## 导出gif
要将录制的`.cast`文件导出为`.gif`文件，需要安装 `agg` 工具。
```bash
brew install agg
```

然后使用以下命令将`.cast`文件导出为`.gif`文件：
```bash
agg demo.cast demo.gif
```
下面为导出gif图片的效果：
![](https://s2.loli.net/2024/11/07/piZVoDU3hktySq5.gif)

## 总结
之所以使用asciinema录制终端，而不是使用其他录屏软件，是因为asciinema可以将终端操作完整记录下来，而且可以使用 `asciinema play` 来回放录制的内容，最最重要的是 **在终端回放时，可以使用鼠标进行框选，并可以复制其中的文本和命令**，这对于我们在终端中进行的操作进行记录和分享非常有用。

有了这个工具，我们在做一些终端方面的教程时，就可以方便的将操作录制下来，只需要将 `.cast` 分享给别人，或者直接将 `.cast` 内嵌到网页中进行播放。
