"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface FunnelChartProps {
  data: any[]
}

export function FunnelChart({ data }: FunnelChartProps) {
  // Calculate funnel metrics
  const totalVisits = data.length
  const productViews = data.filter((d) => d.product_viewed).length
  const addToCarts = data.filter((d) => d.added_to_cart).length
  const orders = data.filter((d) => d.order_placed).length
  const payments = data.filter((d) => d.payment_completed).length

  const funnelData = [
    {
      step: "Visits",
      count: totalVisits,
      percentage: 100,
      conversion: 100,
    },
    {
      step: "Product Views",
      count: productViews,
      percentage: ((productViews / totalVisits) * 100).toFixed(1),
      conversion: ((productViews / totalVisits) * 100).toFixed(1),
    },
    {
      step: "Add to Cart",
      count: addToCarts,
      percentage: ((addToCarts / totalVisits) * 100).toFixed(1),
      conversion: ((addToCarts / productViews) * 100).toFixed(1),
    },
    {
      step: "Orders",
      count: orders,
      percentage: ((orders / totalVisits) * 100).toFixed(1),
      conversion: ((orders / addToCarts) * 100).toFixed(1),
    },
    {
      step: "Payments",
      count: payments,
      percentage: ((payments / totalVisits) * 100).toFixed(1),
      conversion: ((payments / orders) * 100).toFixed(1),
    },
  ]

  const chartConfig = {
    count: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Funnel Analysis</CardTitle>
        <CardDescription>User progression through the e-commerce funnel</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="step" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => [`${value} users (${props.payload.percentage}%)`, "Count"]}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 space-y-2">
          <h4 className="font-semibold">Conversion Rates:</h4>
          {funnelData.slice(1).map((step, index) => (
            <div key={step.step} className="flex justify-between text-sm">
              <span>{step.step}:</span>
              <span className="font-medium">{step.conversion}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
