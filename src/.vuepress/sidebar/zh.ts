import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "快速开始",
      icon: "rocket",
      prefix: "quickstart/",
      link: "quickstart/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
  ],
});
