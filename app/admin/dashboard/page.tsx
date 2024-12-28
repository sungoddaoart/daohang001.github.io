'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VisitorChart } from '../../components/charts/VisitorChart'
import { DAppChart } from '../../components/charts/DAppChart'
import { AdChart } from '../../components/charts/AdChart'
import { NewSubmissionsTable } from '../../components/tables/NewSubmissionsTable'
import { AdPurchasesTable } from '../../components/tables/AdPurchasesTable'

interface DashboardData {
  visitorStats: { date: string; count: number }[];
  dappStats: { category: string; count: number }[];
  adStats: { ad: string; views: number }[];
  newSubmissions: { id: number; title: string; category: string; submittedAt: string }[];
  adPurchases: { id: number; client: string; adType: string; amount: number; purchasedAt: string }[];
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      } else {
        console.error('Failed to fetch dashboard data')
      }
    }
    fetchDashboardData()
  }, [])

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">管理员仪表板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>访客统计</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorChart data={dashboardData.visitorStats} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>DApp 项目统计</CardTitle>
          </CardHeader>
          <CardContent>
            <DAppChart data={dashboardData.dappStats} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>广告浏览统计</CardTitle>
          </CardHeader>
          <CardContent>
            <AdChart data={dashboardData.adStats} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>最新 DApp 提交</CardTitle>
        </CardHeader>
        <CardContent>
          <NewSubmissionsTable data={dashboardData.newSubmissions} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>最新广告购买</CardTitle>
        </CardHeader>
        <CardContent>
          <AdPurchasesTable data={dashboardData.adPurchases} />
        </CardContent>
      </Card>
    </div>
  )
}

