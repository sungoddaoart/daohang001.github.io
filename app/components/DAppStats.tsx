'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DAppStats as DAppStatsType } from '../dapps';

interface DAppStatsProps {
  stats: DAppStatsType;
}

export function DAppStats({ stats }: DAppStatsProps) {
  const data = stats.dailyActiveUsers.map((users, index) => ({
    day: `Day ${index + 1}`,
    users,
    volume: stats.transactionVolume[index],
  }));

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">DApp 使用统计</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" name="日活跃用户" />
          <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#82ca9d" name="交易量" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

