---
title: 快速开始
index: false
icon: rocket
category:
  - 快速开始
tag:
  - 安装
  - 配置
  - 运行
---

:::tip
**你可能需要先安装 [Golang](https://golang.google.cn/)**
:::

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

# 安装

## 配置 OneBotV11 协议服务

由于适配器尚未开发完全，目前 `GoneBot` 仅支持 `OneBotV11` 协议适配器。

以 `Lagrange.OneBot` 作为协议服务端为例：

:::tip
**你可能需要前往下方链接先行安装 `Lagrange.OneBot`。**

**[Lagrange.OneBot 快速部署 & 配置](https://lagrangedev.github.io/Lagrange.Doc/Lagrange.OneBot/Config/)**

**我们会假设你已经在本地安装了 `Lagrange.OneBot`。**
:::

安装好 `Lagrange.OneBot` 后，第一次启动 `Lagrange.OneBot` 并在它生成配置文件后立即退出，修改生成的 `appsettings.json` 其中的 `Implementations` 内容：

:::tip
别忘了填写 `Account` 字段中的 `Uin` 字段，填入机器人的 QQ 号用来登录！
:::

```json
{
    ...,
    "Implementations": [
        {
            "Type": "ReverseWebSocket",
            "Host": "0.0.0.0",
            "Port": 25565,
            "Suffix": "/onebot/v11/ws",
            "ReconnectInterval": 5000,
            "HeartBeatInterval": 5000,
            "AccessToken": ""
        }
    ]
}
```
:::warning
这配置了一项反向 WebSocket 服务，并每五秒尝试连接 `ws://0.0.0.0:25565/onebot/v11/ws`。

这里的地址和端口假定了你在本地运行 GoneBot，并将 OneBotV11 适配器的 WebSocket 端口配置为 25565，你可以根据你的实际需求修改具体的地址和端口。
:::

完成配置后，启动 `Lagrange.OneBot`。

## 安装 GoneBot

我们准备了 `GoneBot` 的一个 Demo，你可以直接下载并运行它：

```sh
git clone https://github.com/gonebot-dev/gonedemo.git
cd gonedemo
go run gonedemo
```

`gonedemo` 使用了如下的配置文件：
```.env
ONEBOTV11_HOST="0.0.0.0:25565"
COMMAND_START="/"
NICKNAME="bot"
```
可以看到，`gonedemo` 默认配置了 WebSocket 地址为 `ws://0.0.0.0:25565/onebot/v11/ws`，与之前的 `Lagrange.OneBot` 配置一致。

等待几秒后，你会看到 `gonedemo` 成功连接到 `Lagrange.OneBot` 并输出相关日志：

![命令行输出](/assets/image/connection.png)

如果你看到了类似上面的日志输出，那么恭喜你，你的第一个 QQ 机器人配置成功了！

:::tip
`gonedemo` 使用 `/` 作为指令前缀，你可以自由修改它，但相关的 `Command` 规则会以该配置作为前缀识别。

关于 `Command` 规则的定义会在之后的章节中给出。
:::

`gonedemo` 默认配置了 [Echo](https://github.com/gonebot-dev/goneplugin-echo) 和 [Status](https://github.com/gonebot-dev/goneplugin-status) 两个插件。

:::tip
你可以通过向 Bot 账号私发 `/echo` 和 `/status` 来测试它们。

它们分别会原封不动地回复相同的消息，和输出当前服务器的状态信息：
:::

![Echo 插件](/assets/image/echo-plugin.png)

![Status 插件](/assets/image/status-plugin.png)

:::warning
在本地测试时，有时 Lagrange.OneBot 可能会一直无法发出链接到 QQ 服务器的图片（它会在日志中明确写出问题），这可能并不是 `GoneBot` 出现的问题。
:::
