---
title: 常用方法 & 约定
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

同时，对于消息段类型和事件类型，你需要实现对应的 MessageType 方法，以方便 `GoneBot` 处理：
```go
// This describes a simple part of a message
type MessageSegment struct {
	// Message type
	Type string `json:"type"`
	// Make sure it implements MessageType interface
	Data MessageType `json:"data"`
}

// Implement this to create a message type
type MessageType interface {
	// Which adapter is this message for
	AdapterName() string
	// Which message type is this message for
	TypeName() string
	// Convert this message segment to raw text
	ToRawText(msg MessageSegment) string
}
```
例如，`GoneBot` 内置的文本消息类型是这样实现的：
```go
type TextType struct {
	Text string `json:"text"`
}

func (serializer TextType) AdapterName() string {
	return ""
}

func (serializer TextType) TypeName() string {
	return "text"
}

func (serializer TextType) ToRawText(msg MessageSegment) string {
	return msg.Data.(TextType).Text
}
```
