---
title: 响应器规则
icon: ruler
order: 2
category:
  - 文档
tag:
  - 插件
  - 规则
author: Kingcq
---

:::warning
编写此文档时，`GoneBot` 版本为 `v1.1.4`
:::

## 简介

响应器规则的写法非常简洁，但它仍然功能齐全，能满足各种复杂的规则需求。

你可以使用 `rule.NewRule()` 来创建一个新的响应规则组，你必须为规则组指定第一个规则，如果你不需要添加规则，你可以使用 `rule.NewRule(rule.Always())` 来让响应器始终响应收到的消息。


## 内置规则

`GoneBot` 内置了一系列常用的规则，你可以直接使用它们来创建规则组：

`rule.Always()` 始终返回 `true`，即始终响应收到的消息。
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

`rule.Never()` 始终返回 `false`，即始终不响应收到的消息。
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

`rule.Command()` 在消息开头包含 `COMMAND_START` 加上其中指定的任一命令时返回 `true`。
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
`COMMAND_START` 在 `.env` 文件中指定，默认为 `/`

在 `rule.Command()` 中可以填入若干条字符串，只要消息开头包含 `COMMAND_START`+其中任一字符串，就会返回 `true`，之后的一些内置响应规则也是如此。
:::

`rule.FullMatch()` 在消息完全匹配指定的若干条字符串时返回 `true`。
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

`rule.Keyword()` 在消息中包含指定的若干条字符串中的任一条时返回 `true`。

如果 `forceStart` 为 `true`，则要求消息中包含的该字符串一定要在消息的开头。
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

`rule.RegEx()` 允许你传入若干个正则表达式字符串，只要消息能被其中任一正则表达式匹配，就会返回 `true`。

同时，正则表达式可能会编译错误，为了更清晰的错误信息，你需要传入插件名称来标记使用该规则的插件。
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

`rule.ToMe()` 在消息体的 `IsToMe` 字段为 `true` 时返回 `true`。
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
`IsToMe` 字段由适配器决定，例如在 QQ 机器人中，如果消息开头包含 `@机器人QQ号`，或者有事件是针对机器人的（如戳一戳），则 `IsToMe` 为 `true`。
:::

`rule.OfType()` 在消息段的第一段的 `Type` 字段和 `AdapterName` 字段都匹配指定的字符串时返回 `true`。
```go
func OfType(typeName, adapterName string) *Rule {
	return &Rule{
		Filter: func(msg message.Message) bool {
			return msg.GetSegments()[0].Type == typeName && msg.GetSegments()[0].Data.AdapterName() == adapterName
		},
	}
}
```

`rule.Notice()` 在消息中包含指定的若干类型中的任一种时返回 `true`。
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

## 自定义规则

如果内置规则不能满足你的要求，你可以自定义规则，只需要像这样创建一个新的 `*rule.Rule` 类型就可以：
```go
Rules: rule.NewRule(rule.IsToMe()).And(&rule.Rule{
  Filter: func(msg message.Message) bool {
    if strings.HasSuffix(msg.GetRawText(), "喵～") {
      return true
    }
    return false
  }
})
```
这样就创建了一个检测消息末尾是否为 `喵～` 的规则，并且只有当消息是 `IsToMe` 时才会触发。

## 连接规则

`rule.NewRule()` 创建了一个规则块，其中可以包含多个规则，它们之间可以使用 `And()` 和 `Or()` 来连接，这些规则会按照连接顺序依次运算，最后得到结果。

如果你需要多个规则块协同运作，你可以使用 `rule.AndRules()` 和 `rule.OrRules()` 来为规则块连接一个新的规则块，运算规则同理。

例如，你需要你的机器人响应 `@自己` 并且包含 `111` 的消息，或者是针对自己的戳一戳消息：
```go
Rules: rule.NewRule(rule.IsToMe()).And(rule.Keyword(false, "111")).
      AndRules(rule.NewRule(rule.IsToMe()).And(rule.Notice("group_poke", "friend_poke")))
```
:::tip
这样构造的规则可能会很长，可以适当换行以更清楚的区分各规则块。
:::
