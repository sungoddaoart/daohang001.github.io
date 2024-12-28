export interface DAppStats {
  dailyActiveUsers: number[];
  transactionVolume: number[];
}

export interface DApp {
  id: number;
  title: string;
  description: string;
  category: string;
  blockchain: string;
  url: string;
  icon: string;
  showStats: boolean;
  stats?: DAppStats;
}

export const dapps: DApp[] = [
  {
    id: 1,
    title: "DecentralizedExchange",
    description: "一个去中心化的加密货币交易平台，支持多种代币交易。",
    category: "金融",
    blockchain: "Ethereum",
    url: "https://decentralizedexchange.com",
    icon: "/icons/decentralized-exchange.webp",
    showStats: true,
    stats: {
      dailyActiveUsers: [1000, 1200, 1100, 1300, 1500, 1400, 1600],
      transactionVolume: [500000, 600000, 550000, 700000, 800000, 750000, 900000]
    }
  },
  {
    id: 2,
    title: "NFTMarketplace",
    description: "一个用于创建、买卖和交易独特数字艺术品的 NFT 市场。",
    category: "艺术",
    blockchain: "Polygon",
    url: "https://nftmarketplace.com",
    icon: "/icons/nft-marketplace.webp",
    showStats: false
  },
  {
    id: 3,
    title: "DeFiLending",
    description: "一个去中心化借贷平台，用户可以存款赚取利息或借款。",
    category: "金融",
    blockchain: "Binance Smart Chain",
    url: "https://defilending.com",
    icon: "/icons/defi-lending.webp",
    showStats: false
  },
  {
    id: 4,
    title: "GameFi",
    description: "一个结合 NFT 和 DeFi 元素的区块链游戏平台。",
    category: "游戏",
    blockchain: "Solana",
    url: "https://gamefi.com",
    icon: "/icons/gamefi.webp",
    showStats: false
  }
];

export const categories = Array.from(new Set(dapps.map(dapp => dapp.category)));
export const blockchains = Array.from(new Set(dapps.map(dapp => dapp.blockchain)));

