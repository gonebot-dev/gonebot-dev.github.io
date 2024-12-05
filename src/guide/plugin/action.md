---
title: Adapter Actions
icon: person-running
order: 4
category:
  - Documentation
tag:
  - Plugin
  - Actions
author: Kingcq
---

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

## Introduction
For adapters, they may define behaviors specific to a platform (such as QQ pokes, merge forwards, etc.), which cannot be represented by message types, but they exist and may be very useful, so `GoneBot` also created corresponding interfaces, and responders can try to let the adapter execute it defined behavior.

The interface definition of adapter behavior is as follows:
```go
// If you want to call adapter action, you should use this struct
type ActionCall struct {
	// Which action
	Action any
	// Which channel to push the result, will initialize automatically
	ResultChannel *chan any
}
```
For adapters, we provide the `CallAction` method to call the adapter behavior:
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
If adapter does not return result to `resultChannel`, `CallAction` will be blocked and stuck in the current responder, if you find this situation, please check whether the `Action` you call is correct.

If it is actually a problem with the adapter, Man! What can I say.
:::

## Adapter behavior call
In the case that the adapter has implemented the corresponding behavior, you can use the `CallAction` method to call it.

For example, in the OneBotV11 adapter, you can call the `CallAction` method to send a private message when the user sends a text containing `test` to the robot:
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
