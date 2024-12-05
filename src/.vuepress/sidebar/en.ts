import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Quick Start",
      icon: "rocket",
      prefix: "quickstart/",
      link: "quickstart/",
      children: "structure",
    },
    {
      text: "Documentation",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
  ],
});
