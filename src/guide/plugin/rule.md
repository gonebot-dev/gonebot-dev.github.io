---
title: Handler Rules
icon: ruler
order: 2
category:
  - Documentation
tag:
  - Plugin
  - Rules
author: Kingcq
---

:::warning
When writing this document, the `GoneBot` version was `v1.1.4`
:::

## Introduction

The way of writing rules in `GoneBot` is very simple, but it is still very powerful and can meet various complex rule requirements.

You can use `rule.NewRule()` to create a new response rule group, you must specify the first rule for the rule group, if you don't need to add rules, you can use `rule.NewRule(rule.Always())` to make the responder always respond to the received messages.

## Built-in Rules

`GoneBot` provides a set of built-in rules that you can use directly to create rule groups:

`rule.Always()` always returns `true`, that is, always respond to the received messages.
```go
// Always always returns true
func Always() *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			return true
		},
	}
}
```

`rule.Never()` always returns `false`, that is, never respond to the received messages.
```go
// Never never returns true
func Never() *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			return false
		},
	}
}
```

`rule.Command()` returns `true` when the message starts with `COMMAND_START` plus any of the specified commands.
```go
func Command(prefixList ...string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			for _, prefix := range prefixList {
				if strings.HasPrefix(
					msg.GetRawText(),
					configurations.GetConf("COMMAND_START")+prefix,
				) {
					return true
				}
			}
			return false
		},
	}
}
```
:::tip
`COMMAND_START` is specified in the `.env` file, the default is `/`

You can add multiple prefixes to `prefixList`, and the responder will respond to the message if it starts with `COMMAND_START` plus any of the specified prefixes.
:::

`rule.FullMatch()` returns `true` when the message matches any of the specified strings.
```go
func FullMatch(strs ...string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			for _, str := range strs {
				if str == msg.GetRawText() {
					return true
				}
			}
			return false
		},
	}
}
```

`rule.Keyword()` returns `true` when the message contains any of the specified strings.

If `forceStart` is `true`, the specified string must be at the beginning of the message.
```go
func Keyword(forceStart bool, keywords ...string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			for _, keyword := range keywords {
				if forceStart && strings.HasPrefix(msg.GetRawText(), keyword) {
					return true
				}
				if !forceStart && strings.Contains(msg.GetRawText(), keyword) {
					return true
				}
			}
			return false
		},
	}
}
```

`rule.RegEx()` allows you to pass in several regular expression strings, and if the message matches any of them, it will return `true`.

Also, regular expressions may compile errors, in order to get clearer error information, you need to pass in the plugin name to mark the plugin that uses this rule.
```go
func RegEx(pluginName string, exprs ...string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			for _, expr := range exprs {
				reg, err := regexp.Compile(expr)
				if err != nil {
					log.Printf("[GONEBOT] | %s: RegEx filter rule compilation error!\n", pluginName)
					return false
				}
				if reg.FindStringIndex(msg.GetRawText()) != nil {
					return true
				}
			}
			return false
		},
	}
}
```

`rule.ToMe()` returns `true` when the `IsToMe` field in the message body is `true`.
```go
func ToMe() *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			return msg.IsToMe
		},
	}
}
```
:::tip
`IsToMe` is determined by the adapter, for example, in the QQ robot, if the message starts with `@robotQQ` or there is an event targeting the robot (such as a poke), `IsToMe` is `true`.
:::

`rule.OfType()` returns `true` when the `Type` field and `AdapterName` field of the first segment of the message body match the specified strings.
```go
func OfType(typeName, adapterName string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			return msg.GetSegments()[0].Type == typeName && msg.GetSegments()[0].Data.AdapterName() == adapterName
		},
	}
}
```

`rule.Notice()` returns `true` when the message contains any of the specified types.
```go
func Notice(typeList ...string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			for _, typeName := range typeList {
				for _, segment := range msg.GetSegments() {
					if segment.Type == typeName {
						return true
					}
				}
			}
			return false
		},
	}
}
```

## Custom Rules

If the built-in rules do not meet your requirements, you can customize rules by creating a new `*rule.Rule` type like this:
```go
Rules: rule.NewRule(rule.IsToMe()).And(&rule.Rule{
  Filter: func(msg message.Message) bool {
    if strings.HasSuffix(msg.GetRawText(), "miao~") {
      return true
    }
    return false
  }
})
```
This creates a rule that checks if the end of the message is `miao~`, and only triggers when the message is `IsToMe`.

## Connecting Rules

`rule.NewRule()` creates a rule block, which can contain multiple rules, which can be connected using `And()` and `Or()`, and the rules will be calculated in the order of connection, and the result will be obtained at the end.

If you need to connect multiple rules, you can use `rule.AndRules()` and `rule.OrRules()` to connect a new rule block, the calculation rules are the same.

For example, you need your robot to respond to `@self` and contain `111` messages, or to respond to your own poke messages:
```go
Rules: rule.NewRule(rule.IsToMe()).And(rule.Keyword(false, "111")).
      AndRules(rule.NewRule(rule.IsToMe()).And(rule.Notice("group_poke", "friend_poke")))
```
:::tip
Rules connected like this may be quite long, and you can insert more line breaks to make it easier to read.
:::
