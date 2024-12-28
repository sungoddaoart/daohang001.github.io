export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Next.js 13的新特性",
    content: "Next.js 13带来了许多激动人心的新特性，包括改进的服务器组件、新的app目录结构、以及更快的刷新速度...",
    author: "张三",
    date: "2023-06-01",
    category: "前端开发"
  },
  {
    id: 2,
    title: "React Server Components简介",
    content: "React Server Components是一种新的组件类型，它允许我们在服务器上渲染React组件，从而提高应用性能...",
    author: "李四",
    date: "2023-06-15",
    category: "React"
  },
  {
    id: 3,
    title: "使用Tailwind CSS构建响应式UI",
    content: "Tailwind CSS是一个实用优先的CSS框架，它可以帮助我们快速构建自定义、响应式的用户界面...",
    author: "王五",
    date: "2023-07-01",
    category: "CSS"
  },
  {
    id: 4,
    title: "TypeScript在大型项目中的应用",
    content: "TypeScript作为JavaScript的超集，在大型项目中有着显著的优势。本文将探讨如何在大型项目中有效地使用TypeScript...",
    author: "赵六",
    date: "2023-07-15",
    category: "TypeScript"
  }
];

export const categories = Array.from(new Set(blogPosts.map(post => post.category)));

