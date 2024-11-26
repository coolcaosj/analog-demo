---
title: ffmpeg做一些有意思的直播推流
description: 现在的直播，大体分两种场景，一是人站在摄像头前直播，还有一种是使用推流软件，将视频，音乐，图片等进行推流直播。第一种场景需要有人一直在镜头前进行直播，而第二种方式，推流的是静态资源，视频，音乐，图片等都是固定的资源，只是不停的轮播而已。那有没有一种方式，既可以无人守护，又可以推流动态资源呢？
slug: ffmpeg-live
tags: [ffmpeg, 直播推流, 无人直播]
date: 2023-11-07 10:33:02
categories: 
- 技术分享
pinned: true
---

![](https://s2.loli.net/2024/11/07/DBK8PCfYp7k36eS.png)

现在的直播，大体分两种场景，一是人站在摄像头前直播，还有一种是使用推流软件，将视频，音乐，图片等进行推流直播。
第一种场景需要有人一直在镜头前进行直播，而第二种方式，推流的是静态资源，视频，音乐，图片等都是固定的资源，只是不停的轮播而已。
那有没有一种方式，既可以无人守护，又可以推流动态资源呢？

<!-- more -->
今天就介绍一下我探索出来的一种方法，使用ffmpeg推流动态资源的方法。
其实原理很简单，就是将动态资源做成网页资源，然后使用浏览器访问该资源显示，最后使用ffmpeg将浏览器推流出来即可。
此方法需要有编程基础，做动态网页，安装所需软件等。

## 环境搭建
首先，我们需要一台服务器，vps，或者私人小主机都可以，不需要公网ip，但需要一直开机进行推流直播。

然后在vps上安装下面所需软件：


|软件名称|	安装命令|	备注|
|----|----|----|
|ffmpeg|	apt install ffmpeg|	直播推流软件|
|xvfb|	apt install xvfb|	xvfb虚拟桌面软件，用以运行浏览器|
|chromium|	apt install chromium|	chrome浏览器开源版本，展示网页动态数据|
|fonts-wqy-zenhei|	apt install fonts-wqy-zenhei|	开源字体，如果不安装中文字体，浏览器中文乱码|
|tmux|	apt install tmux|	终端复用工具，可以保持会话不退出|

> 以上软件为在 ubuntu linux 上的安装示例命令，其他linux可以上网查阅相关命令。


## 动态网页制作
这一步就是开发一套网页系统，用以显示需要动态展示内容的web页面，这里可以根据需要自行开发，可以简单到只有一个静态web页，也可以复杂到前端web+后端接口系统这种web系统。

这里简单起见，我只搭建一个简单地前端页面，用以显示当前时间。大体显示效果如下：
![](https://img.coolcao.site/file/8d945bd6f2505f7eaa2c5.png)


## 关闭防火墙
首先，查看防火墙状态：

```bash
ufw status

Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
```

说明防火墙是开启的。

可以使用 `ufw disable` 关闭


## xvfb启动虚拟显示器
```
Xvfb :99 -screen 0 1920x1080x24
```

以上命令启动一个分辨率为 1920*1080 刷新率 24Hz的虚拟显示器，用以支持浏览器chrome展示页面。


## 运行浏览器
```
DISPLAY=:99 chromium 127.0.0.1:4200/clock --user-data-dir=/root/chrome-profile --no-sandbox --disable-gpu --disable-remote-fonts --disable-features=RendererCodeIntegrity --disable-features=Translate --remote-debugging-port=9222 --incognito  --kiosk --window-size=1920,1080 --start-fullscreen
```

以上命令在虚拟显示器上运行chromium浏览器，并打开网页 `127.0.0.1:4200/clock` 。

这里使用 `—no-sandbox` 和 `—disable-gpu` 参数来禁用沙箱和GPU加速，因为在没有桌面环境的服务器上运行chromium时，这些功能无法正常工作。

`--incognito` 参数开启无痕模式。

`--kiosk` 参数开启chromium演示模式，即全屏显示

`--window-size=1920,1080` 指定浏览器启动后窗口大小为 1920*1080，即和屏幕大小一致

> 💡 既然已经是全屏运行chromium，为啥还要指定 window-size 参数？
> Xvfb 只提供了虚拟的显示屏，不会影响实际的显示设置或物理显示设备。对于浏览器全屏显示的问题，仍然需要检查操作系统、浏览器设置以及其他相关因素，以确保浏览器在全屏模式下使用所需的分辨率。


> 💡 如果启动浏览器时需要黑色模式，则直接在启动命令后添加 `--force-dark-mode` ，即最终命令如下：

```
DISPLAY=:99 /usr/bin/google-chrome --force-dark-mode https://cn.piliapp.com/time/?theme=flip --user-data-dir=/root/chrome-profile --no-sandbox --disable-gpu --disable-remote-fonts --disable-features=RendererCodeIntegrity  --disable-features=Translate --remote-debugging-port=9222 --incognito  --kiosk --window-size=1920,1080 --start-fullscreen
```


## 使用ffmpeg进行推流
```
ffmpeg -f x11grab -video_size 1920x1080 -draw_mouse 0  -i :99 -stream_loop -1 -i /root/tuesday.mp3 -c:v libx264 -c:a aac -preset ultrafast -qp 0 -shortest -f flv "rtmp://直播链接"
```

参数说明：

- `-video_size 1920x1080` 指定推流视频大小为 1920x1080，经测试在xvfb虚拟显示器上分辨率这样，具体如何修改更大分辨率暂时还未找到方法
- `-draw_mouse 0` 该参数指定不显示鼠标指针
- `-i :99` 指定输入为 `:99` 的xvfb开启的虚拟显示器上。这个 `:99` 即是上面 `Xvfb :99 -screen 0 1920x1080x24` 指定的虚拟显示器编号
- `-stream_loop -1` 指定直播流一直循环
- `-i /root/tuesday.mp3` 指定推流背景音乐
- `-c:v libx264` 指定视频编码
- `-c:a aac` 指定音频编码

## 无间断推流
上面命令只是简单的在终端使用ffmpeg启动了推流，但可能会由于各种原因，比如网络不畅，导致推流异常中断退出。解决这个问题，我们可以写一个shell脚本来解决，当推流退出时，我们重新启动推流即可。
shell脚本如下：
```shell
#!/bin/bash

# 推流地址
RTMP_URL="rtmp://推流地址"
# 输入音乐
INPUT="/home/ubuntu/tuesday.mp3"

while true; do
  ffmpeg -f x11grab -video_size 1920x1080 -draw_mouse 0  -i :99 -stream_loop -1 -i $INPUT -c:v libx264 -c:a aac -preset ultrafast -qp 0 -shortest -f flv $RTMP_URL
  if [ $? -ne 0 ]; then
    echo "FFmpeg exited with an error. Restarting..."
    sleep 3
  fi
done
```




