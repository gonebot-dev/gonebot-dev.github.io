---
title: Your First Plugin
icon: plug-circle-check
order: 1
category:
  - Documentation
tag:
  - Plugin
author: Kingcq
---

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

Here, we take the [Echo](https://github.com/goneplugin-echo) plugin as an example:

The main body of the plugin is a `plugin.GonePlugin` type, you can define it globally using `CamelCase` and determine the specific content of its fields in the `init()` method:

```go {4,7-13}
package echo

import (
	"github.com/gonebot-dev/gonebot/plugin"
)

var Echo plugin.GonePlugin

func init() {
  Echo.Name = "Echo"
  Echo.Version = "v0.1.1"
  Echo.Description = "Computer speaks"
}
```

Next, we need to define the `Handlers` field of the plugin, which is a `[]plugin.GoneHandler` type, containing one or more `plugin.GoneHandler` type elements:


`Echo` plugin only needs one `plugin.GoneHandler`, in `plugin.GoneHandler`, we need to define the `Rule` and `Handler` fields of the handler, respectively representing the message screening rules and response functions of the handler:

```go {4-5,7,17-24}
package echo

import (
	"github.com/gonebot-dev/gonebot/adapter"
	"github.com/gonebot-dev/gonebot/message"
	"github.com/gonebot-dev/gonebot/plugin"
	"github.com/gonebot-dev/gonebot/plugin/rule"
)

var Echo plugin.GonePlugin

func init() {
	Echo.Name = "Echo"
	Echo.Version = "v0.1.1"
	Echo.Description = "Reply the same message of what you have sent"

	Echo.Handlers = append(Echo.Handlers, plugin.GoneHandler{
		Rules: rule.NewRules(rule.ToMe()).And(rule.Command("echo")),
		Handler: func(a *adapter.Adapter, msg message.Message) bool {
			reply := message.NewReply(msg).Join(msg)
			a.SendMessage(reply)
			return true
		},
	})
}
```

Firstly, let's take a look at the `Rules` field:

```go
Rules: rule.NewRules(rule.ToMe()).And(rule.Command("echo"))
```

The `Rules` field can be composed of several rules, and each rule can specify a logical relationship between them. The message received will be passed to the handler only if it meets the rules in `Rules`.

The specific introduction of `Rules` field is given in [Handler Rules](/zh/guide/plugin/rule).

Next is the `Handler` field:

```go
Handler: func(a *adapter.Adapter, msg message.Message) bool {
  reply := message.NewReply(msg).Join(msg)
  a.SendMessage(reply)
  return true
}
```

The `Handler` field is a `func(a *adapter.Adapter, msg message.Message) bool` that receives two parameters: `the adapter that received the current message` and `the content of the current received message`, and it returns a `bool` value, indicating whether the message is passed to the next handler after the handler has processed the message.

:::tip
The response order of the handler is related to the `loading order of the plugin` and the `writing order of plugin.GoneHandler in the plugin`, the earlier the order, the earlier the response.
:::

You can use `message.NewReply()` quickly to create an empty response, in Echo, the plugin needs to return the content of the original message completely, you can use `Join()` to merge the content of the message into the response.

After that, you can call `a.SendMessage` to pass the response to the adapter for processing.

:::tip
**handlers can do more than that!** Go to [Message Types](/zh/guide/plugin/message) and [Adapter Actions](/zh/guide/plugin/action) to learn more!
:::

Now, you should have completed the writing of your first plugin, congratulations! Next, you can go to learn more about [Handler Rules](/zh/guide/plugin/rule), [Message Types](/zh/guide/plugin/message) and [Adapter Actions](/zh/guide/plugin/action) in detail!
