---
title: 分享一款终端录屏工具-Hammerspoon
slug: Hammerspoon
tags: [软件, 效率, 窗口管理, mac软件, 免费软件, 开源]
date: 2023-11-06 16:38:12
category:
- 软件推荐
---

![](https://s2.loli.net/2024/11/06/p2HZb9GnRO8zADQ.png)

之前在Mac平台上找窗口管理软件，有些软件是收费的，有些软件设置比较麻烦，有些功能又有限，在无意当中找到一款名为Hammerspoon的软件，它可以让我们在Mac平台上实现窗口管理，并且非常简单易用。

<!-- more -->

## 什么是Hammerspoon
> Hammerspoon是一款开源的macOS应用程序，它允许用户通过编写Lua脚本来自定义和自动化他们的macOS环境。Hammerspoon提供了丰富的功能，包括窗口管理、键盘快捷键、鼠标手势、自动化脚本等，使用户能够更高效地使用macOS。
>
> 用户可以编写 Lua 代码，以便与应用程序、窗口、鼠标指针、文件系统对象、音频设备、电池、屏幕、低级键盘/鼠标事件、剪贴板、位置服务、wifi 等的 macOS API 进行交互。

所以，对于窗口管理功能而言，使用Hammerspoon是一个非常好的选择，因为其本身是开源免费的，而且可以通过Lua脚本进行自定义，定制化的程度很高。

## 下载安装
软件的下载可以在其[官网](https://www.hammerspoon.org/)下载。

![下载](https://s2.loli.net/2024/11/06/znmAKTgJMqUQ6sR.png)

下载下来后是一个压缩包，直接解压得到可执行软件，然后将其拖入到 `/Applications` 目录下即可。

## 配置
双击软件打开软件，会在Mac状态栏有一个小锤子的图标，点击图标弹出菜单，然后选择 `Open Config` 菜单，打开配置文件。
![](https://s2.loli.net/2024/11/06/yZcKoExG6whftC8.png)

配置文件内容大致如下：
```lua

require "window-management"

function reloadConfig(files)
  local doReload = false
  for _,file in pairs(files) do
    if file:sub(-4) == ".lua" then
      doReload = true
    end
  end
  if doReload then
    hs.reload()
    hs.alert.show('Config Reloaded')
  end
end
hs.pathwatcher.new(os.getenv("HOME") .. "/.hammerspoon/", reloadConfig):start()

hs.hotkey.bind({"cmd", "alt", "shift"}, "r", function()
  hs.reload()
end)
hs.alert.show("Config loaded")

```

这是我的配置文件，其中 `require "window-management"` 是引入了一个名为 `window-management` 的lua脚本，这个脚本是和init.lua脚本一个目录，具体位置在 `~/.hammerspoon/`，它可以让我们实现窗口管理的功能。


## 创建管理窗口的脚本

具体的`window-management.lua`脚本内容如下：

```lua
-- -----------------------------------------------------------------------
--                         ** Something Global **                       --
-- -----------------------------------------------------------------------
  -- Uncomment this following line if you don't wish to see animations
hs.window.animationDuration = 0
grid = require "hs.grid"
grid.setMargins('0, 0')

-- Set screen watcher, in case you connect a new monitor, or unplug a monitor
screens = {}
local screenwatcher = hs.screen.watcher.new(function()
  screens = hs.screen.allScreens()
end)
screenwatcher:start()

-- Set screen grid depending on resolution
  -- TODO: set grid according to pixels
for _index,screen in pairs(hs.screen.allScreens()) do
  if screen:frame().w / screen:frame().h > 2 then
    -- 10 * 4 for ultra wide screen
    grid.setGrid('10 * 4', screen)
  else
    if screen:frame().w < screen:frame().h then
      -- 4 * 8 for vertically aligned screen
      grid.setGrid('4 * 8', screen)
    else
      -- 8 * 4 for normal screen
      grid.setGrid('8 * 4', screen)
    end
  end
end

-- Some constructors, just for programming
function Cell(x, y, w, h)
  return hs.geometry(x, y, w, h)
end

-- Please leave a comment if you have any suggestions
-- I know this looks weird, but it works :C
current = {}
function init()
  current.win = hs.window.focusedWindow()
  current.scr = hs.window.focusedWindow():screen()
end

function current:new()
  init()
  o = {}
  setmetatable(o, self)
  o.window, o.screen = self.win, self.scr
  o.screenGrid = grid.getGrid(self.scr)
  o.windowGrid = grid.get(self.win)
  return o
end

-- -----------------------------------------------------------------------
--                   ** ALERT: GEEKS ONLY, GLHF  :C **                  --
--            ** Keybinding configurations locate at bottom **          --
-- -----------------------------------------------------------------------

local function maximizeWindow()
  local this = current:new()
  hs.grid.maximizeWindow(this.window)
end

local function centerOnScreen()
  local this = current:new()
  this.window:centerOnScreen(this.screen)
end


local function leftHalf()
  local this = current:new()
  local cell = Cell(0, 0, 0.5 * this.screenGrid.w, this.screenGrid.h)
  grid.set(this.window, cell, this.screen)
  this.window.setShadows(true)
end

local function rightHalf()
  local this = current:new()
  local cell = Cell(0.5 * this.screenGrid.w, 0, 0.5 * this.screenGrid.w, this.screenGrid.h)
  grid.set(this.window, cell, this.screen)
end

local function topHalf()
  local this = current:new()
  local cell = Cell(0, 0, this.screenGrid.w, 0.5 * this.screenGrid.h)
  grid.set(this.window, cell, this.screen)
end

local function bottomHalf()
  local this = current:new()
  local cell = Cell(0, 0.5 * this.screenGrid.h, this.screenGrid.w, 0.5 * this.screenGrid.h)
  grid.set(this.window, cell, this.screen)
end

local function rightToLeft()
  local this = current:new()
  local cell = Cell(this.windowGrid.x, this.windowGrid.y, this.windowGrid.w - 1, this.windowGrid.h)
  if this.windowGrid.w > 1 then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Small Enough :)")
  end
end

local function rightToRight()
  local this = current:new()
  local cell = Cell(this.windowGrid.x, this.windowGrid.y, this.windowGrid.w + 1, this.windowGrid.h)
  if this.windowGrid.w < this.screenGrid.w - this.windowGrid.x then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Touching Right Edge :|")
  end
end

local function bottomUp()
  local this = current:new()
  local cell = Cell(this.windowGrid.x, this.windowGrid.y, this.windowGrid.w, this.windowGrid.h - 1)
  if this.windowGrid.h > 1 then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Small Enough :)")
  end
end

local function bottomDown()
  local this = current:new()
  local cell = Cell(this.windowGrid.x, this.windowGrid.y, this.windowGrid.w, this.windowGrid.h + 1)
  if this.windowGrid.h < this.screenGrid.h - this.windowGrid.y then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Touching Bottom Edge :|")
  end
end

local function leftToLeft()
  local this = current:new()
  local cell = Cell(this.windowGrid.x - 1, this.windowGrid.y, this.windowGrid.w + 1, this.windowGrid.h)
  if this.windowGrid.x > 0 then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Touching Left Edge :|")
  end
end

local function leftToRight()
  local this = current:new()
  local cell = Cell(this.windowGrid.x + 1, this.windowGrid.y, this.windowGrid.w - 1, this.windowGrid.h)
  if this.windowGrid.w > 1 then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Small Enough :)")
  end
end

local function topUp()
  local this = current:new()
  local cell = Cell(this.windowGrid.x, this.windowGrid.y - 1, this.windowGrid.w, this.windowGrid.h + 1)
  if this.windowGrid.y > 0 then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Touching Top Edge :|")
  end
end

local function topDown()
  local this = current:new()
  local cell = Cell(this.windowGrid.x, this.windowGrid.y + 1, this.windowGrid.w, this.windowGrid.h - 1)
  if this.windowGrid.h > 1 then
    grid.set(this.window, cell, this.screen)
  else
    hs.alert.show("Small Enough :)")
  end
end

-- -----------------------------------------------------------------------
--                           ** Key Binding **                          --
-- -----------------------------------------------------------------------
hk = require "hs.hotkey"
-- * Key Binding Utility
--- Bind hotkey for window management.
-- @function windowBind
-- @param {table} hyper - hyper key set
-- @param { ...{key=value} } keyFuncTable - multiple hotkey and function pairs
--   @key {string} hotkey
--   @value {function} callback function
local function windowBind(hyper, keyFuncTable)
  for key,fn in pairs(keyFuncTable) do
    hk.bind(hyper, key, fn)
  end
end

-- * Set Window Position on screen
-- windowBind({"shift", "alt", "cmd"}, {
windowBind({"ctrl", "alt", "cmd"}, {
  m = maximizeWindow,    -- ⌃⌥⌘ + M
  n = grid.pushWindowNextScreen,
  h = hs.hints.windowHints,
  c = centerOnScreen,    -- ⌃⌥⌘ + C
  left = leftHalf,       -- ⌃⌥⌘ + ←
  right = rightHalf,     -- ⌃⌥⌘ + →
  up = topHalf,          -- ⌃⌥⌘ + ↑
  down = bottomHalf      -- ⌃⌥⌘ + ↓
})

-- * Set Window Position on screen
-- windowBind({"shift","alt"}, {
windowBind({"ctrl","alt"}, {
  left = leftToLeft,
  right = leftToRight,
  up = topUp,
  down = topDown
});

-- * Set Window Position on screen
windowBind({"alt","cmd"}, {
  left = rightToLeft,
  right = rightToRight,
  up = bottomUp,
  down = bottomDown
});

```

这个脚本实现了完整的窗口管理功能，包括最大化窗口、居中窗口、移动窗口、调整窗口大小等功能。
上面是定义了一些窗口管理的函数，然后通过绑定快捷键的方式来调用这些函数，从而实现窗口管理的功能。

比如`ctrl+cmd+alt+left`可以将当前窗口移动到左边，`ctrl+cmd+alt+right`可以将当前窗口移动到右边，`ctrl+cmd+alt+up`可以将当前窗口移动到上边，`ctrl+cmd+alt+down`可以将当前窗口移动到下边，`ctrl+cmd+alt+m`可以将当前窗口最大化，`ctrl+cmd+alt+c`可以将当前窗口居中。

将以上代码保存到 `window-management.lua` 文件中，然后重启Hammerspoon即可通过快捷键来实现窗口管理的功能。

## 总结

Hammerspoon是一个非常强大的MacOS自动化工具，窗口管理只是其中一个简单的功能，可以通过Hammerspoon实现更多的自动化功能，比如自动打开浏览器、自动打开终端、自动打开VSCode等。

有代码基础的同学可以参考[官方文档](https://www.hammerspoon.org/go/)，来编写自己的脚本，实现自己的自动化功能。

或者可以在GitHub上搜索Hammerspoon的插件，来实现更多的自动化功能。
