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

By the way, for message types and event types, you need to implement the corresponding `MessageType` method to facilitate `GoneBot` processing:
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
For example, the text message type of `GoneBot` is implemented like this:
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
