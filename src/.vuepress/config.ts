import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "GoneBot",
      description: "A simple yet powerful golang chatbot framework.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "GoneBot",
      description: "简单，强大的 golang 聊天机器人框架",
    },
  },

  theme,
});
