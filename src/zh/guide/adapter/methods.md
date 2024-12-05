---
title: 常用方法
icon: meteor
order: 3
category:
  - 文档
tag:
  - 适配器
  - 方法
author: Kingcq
---

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

本章节中，整理了一些适配器中常用的方法。

~~整理了一下，发现真的好少~~

## `adapter.ReceiveChannel.Push(msg, true)`
将收到的已经规范化的消息推送到接收通道中，供 `GoneBot` 使用，第二个参数是 `isReceive`，因为 `SendChannel` 也在使用这个方法，只需要填写 `true` 即可

## `adapter.SendChannel.Pull()`, `adapter.ActionChannel.Pull()`
分别从 `SendChannel` 和 `ActionChannel` 中取出一个消息或动作，用来处理，在没有消息或动作时会阻塞线程，直到有消息或动作再返回。

~~卧槽，没了~~
