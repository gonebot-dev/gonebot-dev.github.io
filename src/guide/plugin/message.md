---
title: Message Types
icon: message
order: 3
category:
  - Documentation
tag:
  - Plugin
  - Message
author: Kingcq
---

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

## Introduction
Messages are the most important part of chatbots, and all logic is based on message processing, so understanding message types is very important when writing plugins.

In `GoneBot`, we split a `message` into several `message segments`, each of which represents a special type of message, such as `text`, `image`, etc.

In `GoneBot`, the definition of message types is as follows:

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
Among them, `segments` and `rawText` cannot be modified directly for you, you need to read them through `GetSegments()` and `GetRawText()`.

`MessageType` defines the method of message type, and for a message type, it is important to know which adapter it belongs to (each adapter may implement different message types), its type name, and how it is converted to plain text (for message filtering, etc.).

:::warning
After this, the messages received are all given by the adapter, so you don't need to care about where the message comes from, but only about the specific content of the message.
:::

## Message Construction
The construction method of messages is similar to `Rules`, you can use `message.NewReply()` to quickly create an empty reply to a message, or use `message.NewMessage()` to create a new message.

:::tip
When using `message.NewMessage()`, you may miss some fields that need to be specified.
Therefore, it is not recommended to use `message.NewMessage()` before you are completely sure.
:::

`GoneBot` has built-in some simple and common message types:
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
You can use these methods to quickly add text, image, voice, video, and file messages to the message:
```go
reply := message.NewReply(msg).
        Text("Hello, world!").
        Image("https://ecosystem.vuejs.press/images/hero.png")
```
Like above, you can quickly create a reply that contains both text and images.

Of course, for the message type defined by the adapter, `GoneBot` naturally does not have the corresponding addition method, but you can add any message type using `Any()`:

For example, add a qq emoji to the message just now:
```go {3}
reply := message.NewReply(msg).
        Text("Hello, world!").
        Any(onebotv11.FaceType{ ID: 123 }).
        Image("https://ecosystem.vuejs.press/images/hero.png")
```
If you already have two message bodies, and you want to concatenate them together, you can use `Join()` to connect the two messages together:
```go
reply := message.NewReply(msg).Join(msg)
```
This will create a reply that is exactly the same as the original message.

## Message Sending

When you have constructed a message, you always want to send it out. In the `Handler`, `GoneBot` will pass in the adapter pointer, and you can judge the type of adapter and send messages through it:
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
You may find that the above code wrote `a.SendMessage(reply)` three times.

The plugins should be able to reply to multiple messages, why not?

So does the `CallAction()` in [Adapter Actions](/zh/plugin/action).
:::
