"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, ShoppingCart, CreditCard, Eye } from "lucide-react"

interface MetricsCardsProps {
  data: any[]
}

export function MetricsCards({ data }: MetricsCardsProps) {
  const totalVisits = data.length
  const productViews = data.filter((d) => d.product_viewed).length
  const addToCarts = data.filter((d) => d.added_to_cart).length
  const orders = data.filter((d) => d.order_placed).length
  const payments = data.filter((d) => d.payment_completed).length

  const metrics = [
    {
      title: "Total Visits",
      value: totalVisits.toLocaleString(),
      description: "Unique user sessions",
      icon: Users,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Product Views",
      value: `${((productViews / totalVisits) * 100).toFixed(1)}%`,
      description: `${productViews} of ${totalVisits} visitors`,
      icon: Eye,
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Add to Cart Rate",
      value: `${((addToCarts / productViews) * 100).toFixed(1)}%`,
      description: `${addToCarts} added to cart`,
      icon: ShoppingCart,
      trend: "-2.1%",
      trendUp: false,
    },
    {
      title: "Purchase Completion",
      value: `${((payments / orders) * 100).toFixed(1)}%`,
      description: `${payments} completed payments`,
      icon: CreditCard,
      trend: "+5.7%",
      trendUp: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
            <div className="flex items-center mt-2">
              {metric.trendUp ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={`text-xs ${metric.trendUp ? "text-green-500" : "text-red-500"}`}>{metric.trend}</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
