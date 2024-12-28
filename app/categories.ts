export interface Category {
  id: number;
  name: string;
  keywords: string[];
  description: string;
  parentId: number | null;
  children: Category[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: "金融",
    keywords: ["DeFi", "交易", "借贷"],
    description: "包括去中心化金融、交易所和借贷平台等金融类DApp。",
    parentId: null,
    children: [
      {
        id: 2,
        name: "交易所",
        keywords: ["DEX", "流动性", "交易对"],
        description: "去中心化交易所和相关金融工具。",
        parentId: 1,
        children: []
      },
      {
        id: 3,
        name: "借贷",
        keywords: ["借贷", "抵押", "利息"],
        description: "去中心化借贷平台和相关金融服务。",
        parentId: 1,
        children: []
      }
    ]
  },
  {
    id: 4,
    name: "游戏",
    keywords: ["GameFi", "NFT", "元宇宙"],
    description: "包括区块链游戏、GameFi项目和相关娱乐应用。",
    parentId: null,
    children: [
      {
        id: 5,
        name: "角色扮演",
        keywords: ["RPG", "冒险", "角色"],
        description: "基于区块链的角色扮演游戏。",
        parentId: 4,
        children: []
      },
      {
        id: 6,
        name: "策略",
        keywords: ["战略", "资源管理", "回合制"],
        description: "基于区块链的策略类游戏。",
        parentId: 4,
        children: []
      }
    ]
  }
];

