---
title: 生命周期
icon: heart-pulse
order: 2
category:
  - 文档
tag:
  - 适配器
  - 生命周期
author: Kingcq
---

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

在 `GoneBot` 中，适配器的生命周期非常简单，开始，和结束。也就是适配器的启动和销毁。

在定义上，适配器需要实现 `Start` 方法和 `Finalize` 方法，这两个方法均不需要任何参数，其中 `Start` 方法会通过 `goroutine` 启动，适配器应当在 `Start` 方法中启动自己的业务逻辑，`Finalize` 方法会在 `GoneBot` 关闭时调用，适配器应当在此方法中释放资源，防止泄漏。

## 开始
在 `Start` 方法启动之后，适配器有一些不得不做的工作，以方便 `GoneBot` 能够正常工作：

- ### 1. 启动消息收取
&emsp;&emsp;适配器应当以自己的方式收取来自聊天平台的消息，并将消息转换为 `GoneBot` 规定的 `Message` 类型，并使用 `ReceiveChannel.Push(msg, true)` 将消息塞入适配器的收取消息队列，`GoneBot` 会从此队列中取出消息，并将消息传递给插件。

- ### 2. 启动消息发送
&emsp;&emsp;在经过插件的处理之后，插件的回复会被塞入适配器的发送消息队列 `SendChannel`，适配器需要将这些回复以自己的方式发送到聊天平台。

- ### 3. 启动行为监听
&emsp;&emsp;如果聊天平台实现了一些自定义行为（如 QQ 的戳一戳等），插件可能会产生一些行为调用，`GoneBot` 会将这些调用塞入适配器的 `ActionChannel`，适配器需要处理这些行为，并将处理结果塞入传入的 `ActionCall` 所指定的 `ResultChannel`。
:::warning
无论调用结果如何，你都需要塞**至少一个**结果进入 `ResultChannel`，否则调用该行为的插件会原地卡死！

我警告你！:index_pointing_at_the_viewer::index_pointing_at_the_viewer::index_pointing_at_the_viewer:
:::

## 结束
在 `GoneBot` 关闭时，会依次调用所有适配器的 `Finalize` 方法，适配器应当在此方法中释放所有资源，防止泄漏。
:::warning
但这并不意味着你可以随意阻塞线程！否则会导致 `GoneBot` 不能正常关闭！
:::
:::tip
直到 `v1.1.4` 版本，`GoneBot` 还无法在用户使用 `Ctrl+C` 时正常退出，在之后的版本中，`GoneBot` 将会尝试修复这个问题
:::
