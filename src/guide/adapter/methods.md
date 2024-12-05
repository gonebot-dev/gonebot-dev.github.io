---
title: Common Methods
icon: meteor
order: 3
category:
  - Documentation
tag:
  - Adapter
  - Methods
author: Kingcq
---

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

In this chapter, some commonly used methods in adapters are summarized.

~~They are really so few!~~

## `adapter.ReceiveChannel.Push(msg, true)`
It will receive a message from the `ReceiveChannel` and normalize it, and then call `adapter.SendChannel.Push(msg, true)` to push it to the `SendChannel`.

## `adapter.SendChannel.Pull()`, `adapter.ActionChannel.Pull()`
They will pull a message or action from the `SendChannel` or `ActionChannel` respectively, normalize it, and then return it.
They will not return until a message or action is received.

~~Oh shoot, that's all of it?~~
