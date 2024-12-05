---
title: Life Cycle
icon: heart-pulse
order: 2
category:
  - Documentation
tag:
  - Adapter
  - Life Cycle
author: Kingcq
---

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

In `GoneBot` Adapter, the lifecycle is very simple, start, and end. That is, the start and destruction of the adapter.

In terms of definition, the adapter needs to implement the `Start` method and the `Finalize` method. These two methods do not require any parameters. The `Start` method will be started by `goroutine`, and the adapter should start its own business logic in the `Start` method. The `Finalize` method will be called when `GoneBot` is closed, and the adapter should release resources in this method to prevent leakage.

## Start
After the `Start` method is started, the adapter has some work to do to facilitate `GoneBot` to work properly:

- ### 1. Start message reception
&emsp;&emsp;The adapter should receive messages from the chat platform in its own way, convert the messages to the `Message` type specified by `GoneBot`, and use `ReceiveChannel.Push(msg, true)` to put the message into the adapter's message reception queue. `GoneBot` will take the message from this queue and pass it to the plugin.

- ### 2. Start message sending
&emsp;&emsp;After the plugin is processed, the plugin's reply will be pushed into the adapter's send message queue `SendChannel`, and the adapter needs to send these replies to the chat platform in its own way.

- ### 3. Start behavior listening
&emsp;&emsp;If the chat platform implements some custom behavior (such as QQ's poke), the plugin may generate some behavior calls, `GoneBot` will put these calls into the adapter's `ActionChannel`, and the adapter needs to handle these behaviors and put the processing results into the `ResultChannel` specified by the `ActionCall`.
:::warning
Regardless of the result of the call, you need to push at least one result into `ResultChannel`, otherwise the plugin that calls the behavior will be stuck in place!

I warn you! :index_pointing_at_the_viewer::index_pointing_at_the_viewer::index_pointing_at_the_viewer:
:::

## End
When `GoneBot` is closed, the `Finalize` method of all adapters will be called in turn. The adapter should release all resources in this method to prevent leakage.
:::warning
But this does not mean you can block the thread at will! Otherwise, it will cause `GoneBot` to be unable to close properly!
:::
:::tip
Until version `v1.1.4`, `GoneBot` cannot exit properly when the user uses `Ctrl+C`. In the subsequent versions, `GoneBot` will try to fix this problem.
:::
