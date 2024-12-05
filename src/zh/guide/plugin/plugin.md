---
title: 你的第一个插件
icon: plug-circle-check
order: 1
category:
  - 文档
tag:
  - 插件
author: Kingcq
---

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

在这里，我们以 [Echo](https://github.com/goneplugin-echo) 插件为例：

插件的主体是一个 `plugin.GonePlugin` 类型，你可以在全局使用 `大驼峰命名法` 定义它，并在 `init()` 方法中确定它字段的具体内容：

```go {4,7-13}
package echo

import (
	"github.com/gonebot-dev/gonebot/plugin"
)

var Echo plugin.GonePlugin

func init() {
  Echo.Name = "Echo"
  Echo.Version = "v0.1.1"
  Echo.Description = "计算机学说话"
}
```

接下来，需要定义插件的 `Handlers` 字段，它是一个 `[]plugin.GoneHandler` 类型，包含一个或多个 `plugin.GoneHandler` 类型的元素：

`Echo` 插件只需要一个 `plugin.GoneHandler`，在 `plugin.GoneHandler` 中，我们需要定义该响应器的 `Rule` 和 `Handler` 字段，分别表示该响应器的消息筛选规则和响应函数：

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

我们先来看 `Rules` 字段：

```go
Rules: rule.NewRules(rule.ToMe()).And(rule.Command("echo"))
```

`Rules` 字段可以由若干的规则构成，每个规则之间可以指定逻辑关系，收到的消息符合 `Rules` 中的规则，才会被传递给响应器。

`Rules` 字段的具体介绍由 [响应器规则](/zh/guide/plugin/rule) 给出。

接下来是 `Handler` 字段：

```go
Handler: func(a *adapter.Adapter, msg message.Message) bool {
  reply := message.NewReply(msg).Join(msg)
  a.SendMessage(reply)
  return true
}
```

`Handler` 字段是一个 `func(a *adapter.Adapter, msg message.Message) bool`，它接收的两个参数分别为 `当前收到消息的适配器` 和 `当前收到的消息内容`，它返回一个 `bool` 值，表示在该响应器处理完消息后，是否继续将消息传递给下一个响应器。

:::tip
响应器的响应顺序与`插件的加载顺序`以及`插件中 plugin.GoneHandler 的编写顺序`有关，排得越前，响应越早。
:::

你可以使用 `message.NewReply()` 快速创建一个空响应，在 Echo 中，插件需要返回和原消息完全一样的内容，你可以使用 `Join()` 将消息的内容合并进响应中。

之后，你可以调用 `a.SendMessage` 将响应移交给适配器处理。

:::tip
**响应器可不止能做这些！**，前往 [消息类型](/zh/guide/plugin/message) 和 [适配器行为](/zh/guide/plugin/action) 了解更多！
:::

到这里，你应该已经完成了你的第一个插件的编写，恭喜你！接下来，你可以去详细了解 [响应器规则](/zh/guide/plugin/rule)，[消息类型](/zh/guide/plugin/message) 和 [适配器行为](/zh/guide/plugin/action) 的更多写法了！
