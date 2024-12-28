'use client'

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VisitorChartProps {
  data: { date: string; count: number }[]
}

export function VisitorChart({ data }: VisitorChartProps) {
  return (
    <ChartContainer
      config={{
        count: {
          label: "访客数",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="var(--color-count)" name="访客数" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

