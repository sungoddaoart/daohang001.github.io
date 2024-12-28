'use client'

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DAppChartProps {
  data: { category: string; count: number }[]
}

export function DAppChart({ data }: DAppChartProps) {
  return (
    <ChartContainer
      config={{
        count: {
          label: "DApp 数量",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="count" fill="var(--color-count)" name="DApp 数量" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

