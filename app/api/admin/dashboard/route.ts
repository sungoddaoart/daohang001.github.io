import { NextResponse } from 'next/server'

// 模拟数据，实际应用中应该从数据库获取
const dashboardData = {
  visitorStats: [
    { date: '2023-06-01', count: 100 },
    { date: '2023-06-02', count: 120 },
    { date: '2023-06-03', count: 150 },
    { date: '2023-06-04', count: 130 },
    { date: '2023-06-05', count: 180 },
  ],
  dappStats: [
    { category: '金融', count: 50 },
    { category: '游戏', count: 30 },
    { category: '社交', count: 20 },
    { category: '工具', count: 40 },
  ],
  adStats: [
    { ad: '首页横幅', views: 5000 },
    { ad: '侧边栏', views: 3000 },
    { ad: '列表页顶部', views: 2000 },
    { ad: '详情页底部', views: 1500 },
  ],
  newSubmissions: [
    { id: 1, title: 'DeFi 交易所', category: '金融', submittedAt: '2023-06-05 14:30' },
    { id: 2, title: 'NFT 游戏', category: '游戏', submittedAt: '2023-06-05 15:45' },
    { id: 3, title: '去中心化社交平台', category: '社交', submittedAt: '2023-06-05 16:20' },
  ],
  adPurchases: [
    { id: 1, client: 'ABC 公司', adType: '首页横幅', amount: 5000, purchasedAt: '2023-06-05 10:00' },
    { id: 2, client: 'XYZ 工作室', adType: '侧边栏', amount: 3000, purchasedAt: '2023-06-05 11:30' },
    { id: 3, client: '123 科技', adType: '列表页顶部', amount: 2000, purchasedAt: '2023-06-05 13:15' },
  ],
}

export async function GET() {
  // 在实际应用中，这里应该从数据库获取数据
  return NextResponse.json(dashboardData)
}

