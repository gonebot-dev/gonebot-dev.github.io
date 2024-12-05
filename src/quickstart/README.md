---
title: Quick Start
index: false
icon: rocket
category:
  - Quick Start
tag:
  - Installation
  - Configuration
  - Running
---

:::tip
**You may need to install [Golang](https://golang.google.cn/) first.**
:::

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

# Installation

## Configuring OneBotV11 Protocol Services

`GoneBot` currently only supports the `OneBotV11 protocol adapter` as the adapter has not been fully developed.

We use `Lagrange.OneBot` as an example of protocol server:

:::tip
**You may need to go to the link below to install `Lagrange.OneBot` first.**

**[Lagrange.OneBot 快速部署 & 配置](https://lagrangedev.github.io/Lagrange.Doc/Lagrange.OneBot/Config/)**

**We will assume that you have already installed it `Lagrange.OneBot` locally.**
:::

After installing `Lagrange.OneBot`，Start `Lagrange.OneBot` for the first time and exit immediately after it generates the configuration file. Change the `Implementations` field in the `appsettings.json`:

:::tip
Don't forget to change the `Uin` Field in `Account` Field, filling it with the id of your QQ account for login!
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
This configures a reverse websocket, and it will attempt to connect to `ws://0.0.0.0:25565/onebot/v11/ws` every 5 seconds.

The address and port here are assumed that you are running `GoneBot` locally and the WebSocket port of the OneBotV11 adapter is configured as 25565, you can modify the specific address and port according to your actual needs.
:::

After the configuration, launch `Lagrange.OneBot`.

## Install GoneBot

We prepared a simple demo for `GoneBot`, you can download and run it:

```sh
git clone https://github.com/gonebot-dev/gonedemo.git
cd gonedemo
go run gonedemo
```

`gonedemo` is using the `.env` file below:
```.env
ONEBOTV11_HOST="0.0.0.0:25565"
COMMAND_START="/"
NICKNAME="bot"
```
As you can see, `gonedemo` configures the address of websocket to `ws://0.0.0.0:25565/onebot/v11/ws`. It is consistent with the previous configuration.

After waiting for several seconds, you will see that `gonedemo` successfully connected to `Lagrange.OneBot` and output related logs:

![Commandline output](/assets/image/connection.png)

If you see logs like above, then congratulations, your first QQ bot configuration is successful!

:::tip
`gonedemo` is using `/` as the prefix of the command, you can modify it freely, but the related `Command` rules will be identified with the configuration as the prefix.

The definition of `Command` rules will be given in later chapters.
:::

`gonedemo` is configured with [Echo](https://github.com/gonebot-dev/goneplugin-echo) 和 [Status](https://github.com/gonebot-dev/goneplugin-status).

:::tip
You can test the Echo and Status plugins by sending `/echo` and `/status` to the bot account in private chat.

They will reply the same message as you send, or output the current server status information.
:::

![Echo Plugin](/assets/image/echo-plugin.png)

![Status Plugin](/assets/image/status-plugin.png)

:::warning
In local testing, it is possible that `Lagrange.OneBot` will not be able to send images to the QQ server all the time (it will clearly state the problem in the log), this may not be a problem with `GoneBot`.
:::
