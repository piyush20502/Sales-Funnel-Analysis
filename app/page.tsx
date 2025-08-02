"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FunnelChart } from "@/components/funnel-chart"
import { MetricsCards } from "@/components/metrics-cards"
import { DataTable } from "@/components/data-table"
import { AIAnalysis } from "@/components/ai-analysis"
import { BarChart3, TrendingUp } from "lucide-react"
import { generateSampleData } from "@/utils/sample-data" // Import the generateSampleData function

export default function SalesFunnelAnalysis() {
  const [sampleData] = useState(() => generateSampleData(1000))
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sales Funnel Analysis Dashboard</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ai-analysis" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              AI Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <MetricsCards data={sampleData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FunnelChart data={sampleData} />
              <Card>
                <CardHeader>
                  <CardTitle>Sample Data Overview</CardTitle>
                  <CardDescription>First 10 rows of simulated user session data</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={sampleData.slice(0, 10)} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-analysis">
            <AIAnalysis data={sampleData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
