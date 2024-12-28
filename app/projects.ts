export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "电子商务平台",
    description: "一个功能齐全的在线购物网站，支持用户注册、商品浏览、购物车和支付功能。",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    id: 2,
    title: "任务管理应用",
    description: "一个帮助用户组织和跟踪日常任务的应用程序，支持任务创建、编辑、删除和标记完成。",
    technologies: ["Vue.js", "Firebase", "Vuex"]
  },
  {
    id: 3,
    title: "天气预报应用",
    description: "一个实时显示全球各地天气状况的应用程序，支持位置搜索和5天预报。",
    technologies: ["React Native", "OpenWeatherMap API", "Redux"]
  }
];

