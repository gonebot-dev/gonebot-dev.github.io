---
title: 适配器行为
icon: person-running
order: 4
category:
  - 文档
tag:
  - 插件
  - 适配器行为
author: Kingcq
---

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

## 简介
对于适配器，它们可能会定义专属于某个平台的行为（如 QQ 戳一戳、合并转发等），这些行为不能用消息类型表示，但它们存在而且可能非常有用，因此，`GoneBot` 也创建了对应的接口，响应器可以通过这些接口，尝试让适配器执行它定义的行为。

适配器行为的接口定义如下：
```go
// If you want to call adapter action, you should use this struct
type ActionCall struct {
	// Which action
	Action any
	// Which channel to push the result, will initialize automatically
	ResultChannel *chan any
}
```
对于适配器，我们提供了 `CallAction` 方法，用于调用适配器行为：
```go
func (a *Adapter) CallAction(action any) (result any) {
	act := message.ActionCall{Action: action}
	resultChannel := make(chan any, 1)
	act.ResultChannel = &resultChannel
	a.ActionChannel.Push(&act)
	return <-resultChannel
}
```
:::tip
如果适配器没有返回结果到 `resultChannel`，`CallAction` 会卡死并阻塞当前响应器，如果你发现这种情况，请检查你调用的 `Action` 是否正确。

而如果发现实际上是适配器的问题，Man! What can I say.
:::

## 适配器行为调用
在适配器已经实现了对应行为的情况下，你可以使用 `CallAction` 方法调用它。

例如，在 OneBotV11 适配器中，你可以在用户向机器人发送含 `test` 的文本时调用 `CallAction` 方法来发送私发消息：

```go
// ...

var ActionTrial plugin.GonePlugin

func init() {
  ActionTrial.Name = "Action Trial"
  ActionTrial.Version = "v0.0.1"
  ActionTrial.Description = "A plugin for testing actions"

  ActionTrial.Handlers = append(ActionTrial.Handlers, plugin.GoneHandler{
    Rules: rule.NewRules(rule.ToMe()).And(rule.Keyword(false, "test")),
    Handler: func(a *adapter.Adapter, msg message.Message) bool {
      a.CallAction(onebotv11.SendPrivateMessage{
        UserID:  114514,
        Message: message.NewReply(msg).Text("Hello!").GetSegments(),
      })
      return true
    },
  })
}
```
