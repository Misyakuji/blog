import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/notes/",
  {
    text: "技术栈",
    icon: "pen-to-square",
    prefix: "/notes/",
    children: [
      {
        text: "后端",
        icon: "pen-to-square",
        prefix: "backend/",
        children: [
          { text: "Java", icon: "pen-to-square", link: "Spring" },
        ],
      },
      {
        text: "前端",
        icon: "pen-to-square",
        prefix: "fontend/",
        children: [
          {
            text: "Vue",
            icon: "pen-to-square",
            link: "Vue",
          },
          {
            text: "Angular",
            icon: "pen-to-square",
            link: "Angular",
          },
          "React",
        ],
      },
      { text: "Docker运维", icon: "pen-to-square", link: "dev/docker" },
    ],
  },
]);
