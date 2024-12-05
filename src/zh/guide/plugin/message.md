---
title: 消息类型
icon: message
order: 3
category:
  - 文档
tag:
  - 插件
  - 消息
author: Kingcq
---

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

## 简介
消息是聊天机器人最为重要的部分，所有的逻辑都围绕消息处理展开，因此，了解消息类型对于编写插件非常重要。

在 `GoneBot` 中，我们将一段 `消息` 拆分为若干个 `消息段`，每个消息段代表一段特殊类型的消息，例如 文本`text`，图片`image` 等。

对于消息类型，`GoneBot` 的定义如下：

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

// This describes the whole message
type Message struct {
	// Is the message to me?
	IsToMe bool
	// Which group is it in?(Only useful with group message and notice)
	Group string
	// Who is sending this message?
	Sender string
	// Who is receiving this message?
	Receiver string
	// Who am i?
	Self string
	// All the message segments
	segments []MessageSegment
	// All the text segments are added together
	rawText string
}
```
其中，`segments` 和 `rawText` 无法直接被你修改，你需要通过 `GetSegments()` 和 `GetRawText()` 来读取它们。

`MessageType` 定义了消息类型的方法，对于一个消息类型，重要的是它所属的适配器（每个适配器可能会实现不同的消息类型），它的类型名称，以及它如何被转换为纯文本（用于消息筛选等）。

:::warning
在这之后的内容，收到的消息都由适配器给出，因此，你无需关心消息从何而来，而只需关心消息的具体内容。
:::

## 消息构造
消息的构造方式和 `Rules` 类似，你可以使用 `message.NewReply()` 快速创建对一条消息的空回复，也可以使用 `message.NewMessage()` 创建一条新的消息。

:::tip
使用 `message.NewMessage()` 时，你可能会漏掉一些需要指定的字段。

因此，在完全有把握之前，不推荐使用 `message.NewMessage()`
:::

`GoneBot` 内置了一些简单、通用的消息类型：
```go
// Text attachs a plain text message segment to message
func (m *Message) Text(text string) *Message {
	m.AttachSegment(MessageSegment{
		Type: "text",
		Data: TextType{
			Text: "Hello, world!",
		},
	})
	return m
}

// Image attachs an image message segment to message
func (m *Message) Image(file string) *Message {
	m.AttachSegment(MessageSegment{
		Type: "image",
		Data: ImageType{
			File: file,
		},
	})
	return m
}

// Voice attachs a voice message segment to message
func (m *Message) Voice(file string) *Message {
	m.AttachSegment(MessageSegment{
		Type: "voice",
		Data: VoiceType{
			File: file,
		},
	})
	return m
}

// Video attachs a video message segment to message
func (m *Message) Video(file string) *Message {
	m.AttachSegment(MessageSegment{
		Type: "video",
		Data: VideoType{
			File: file,
		},
	})
	return m
}

// File attachs a file message segment to message
func (m *Message) File(file string) *Message {
	m.AttachSegment(MessageSegment{
		Type: "file",
		Data: FileType{
			File: file,
		},
	})
	return m
}
```
你可以直接在 `message` 中添加并连接它们：
```go
reply := message.NewReply(msg).
        Text("Hello, world!").
        Image("https://ecosystem.vuejs.press/images/hero.png")
```
像上面这样，你就能快速创建一个同时包含文本和图片的回复。

当然，对于适配器定义的消息类型，`GoneBot` 自然不会有对应的添加方法，但你可以通过 `Any()` 来添加任意的消息类型：

例如，像这样为刚刚的消息添加一个 qq 表情：
```go {3}
reply := message.NewReply(msg).
        Text("Hello, world!").
        Any(onebotv11.FaceType{ ID: 123 }).
        Image("https://ecosystem.vuejs.press/images/hero.png")
```

如果你已经得到了两个现成的消息体，想把它们连在一起，你可以使用 `Join()` 来连接两条消息：
```go
reply := message.NewReply(msg).Join(msg)
```
这样就能创建一条与原消息完全一样的回复。

## 消息发送

当你构造好一条消息，你总是希望将消息发出去。在 `Handler` 中，`GoneBot` 会传入适配器指针，你可以通过它来判断适配器类型和发送消息：
```go {2-11}
Handler: func (a *adapter.Adapter, msg message.Message) bool {
  var reply *message.Message
  if a.Name == onebotv11.OneBotV11.Name {
    reply = message.NewReply(msg).
            Text("Hello, world!").
            Any(onebotv11.FaceType{ ID: 123 }).
            Image("https://ecosystem.vuejs.press/images/hero.png")
  } else {
    reply = message.NewReply(msg).join(msg)
  }
  a.SendMessage(reply)
  a.SendMessage(reply)
  a.SendMessage(reply)
  return true
}
```
:::tip
你可能会发现上面的连续写了三次 `a.SendMessage(reply)`

插件就应该能连续回复多个消息，为什么不呢？

之后的 [适配器行为](/zh/plugin/action) 中的 `CallAction()` 也是一样。
:::
