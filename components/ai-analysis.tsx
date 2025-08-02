"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"

interface AIAnalysisProps {
  data: any[]
}

// Add this function at the top of the component, before the AIAnalysis function
const getDemoAnalysis = (query?: string) => {
  const demoResponses = {
    "Drop-off Analysis": `**Key Findings:**
1. **Highest Drop-off Point**: Product View to Add-to-Cart (65% drop-off rate)
2. **Secondary Concern**: Visit to Product View (25% drop-off rate)
3. **Strong Performance**: Payment completion rate at 85%

**Critical Drop-off Points:**
- **Product View → Add to Cart**: Only 35% conversion suggests issues with:
  - Product pricing transparency
  - Insufficient product information
  - Poor mobile experience
  - Lack of trust signals

**Optimization Recommendations:**
1. **Immediate Actions** (0-2 weeks):
   - Add customer reviews and ratings
   - Implement urgency indicators (limited stock, offers)
   - Optimize mobile product pages

2. **Medium-term** (1-2 months):
   - A/B test different pricing displays
   - Implement personalized recommendations
   - Add social proof elements

**Expected Business Impact:**
- Improving Add-to-Cart rate by 10% could increase overall conversion by 25%
- Potential revenue increase: 15-20% with current traffic

**Implementation Priority:**
1. Mobile optimization (High impact, Low effort)
2. Trust signals (High impact, Medium effort)
3. Personalization (Medium impact, High effort)`,

    "Conversion Optimization": `**Conversion Optimization Strategy:**

**Stage 1: Product View Optimization**
- Implement lazy loading for faster page speeds
- Add 360° product views and zoom functionality
- Include size guides and fit recommendations
- Show real-time inventory levels

**Stage 2: Add-to-Cart Enhancement**
- Simplify the add-to-cart process (reduce clicks)
- Add "Save for Later" option to reduce abandonment
- Implement exit-intent popups with discounts
- Show shipping costs upfront

**Stage 3: Checkout Optimization**
- Enable guest checkout option
- Add multiple payment methods (UPI, wallets, BNPL)
- Implement progress indicators
- Add security badges and SSL certificates

**Expected Improvements:**
- Product View Rate: +5-8%
- Add-to-Cart Rate: +12-15%
- Checkout Completion: +8-10%

**ROI Calculation:**
Current monthly revenue impact of 10% improvement across all stages:
- Estimated additional revenue: ₹2-3 lakhs per month
- Implementation cost: ₹50,000-1 lakh
- ROI: 200-400% within 6 months`,

    default: `**Comprehensive Funnel Analysis:**

**Current Performance Overview:**
Your e-commerce funnel shows typical patterns with room for significant improvement:

**Strengths:**
✅ High payment completion rate (85%) indicates smooth checkout
✅ Decent order-to-payment conversion shows trust in the platform
✅ Mobile traffic engagement is reasonable

**Areas for Improvement:**

**1. Product Discovery & Engagement**
- 25% of visitors don't view any products
- Recommendation: Improve homepage design, search functionality, and navigation

**2. Purchase Intent Conversion**
- 65% drop-off from product view to cart addition
- This is your biggest opportunity for revenue growth

**3. Cart Abandonment**
- 32% don't complete orders after adding to cart
- Focus on checkout process optimization

**Business Impact Projections:**
- **Conservative estimate**: 15% revenue increase with basic optimizations
- **Aggressive estimate**: 30-40% increase with comprehensive improvements

**Next Steps:**
1. Implement heat mapping tools to understand user behavior
2. Conduct user surveys to identify pain points
3. A/B test key funnel improvements
4. Monitor metrics weekly and iterate quickly

**Timeline:** 3-6 months for full implementation and results measurement.`,
  }

  return demoResponses[query as keyof typeof demoResponses] || demoResponses.default
}

export function AIAnalysis({ data }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [customQuery, setCustomQuery] = useState("")

  // Update the generateAnalysis function to include demo mode
  const generateAnalysis = async (query?: string) => {
    setLoading(true)
    try {
      // Calculate funnel metrics for context
      const totalVisits = data.length
      const productViews = data.filter((d) => d.product_viewed).length
      const addToCarts = data.filter((d) => d.added_to_cart).length
      const orders = data.filter((d) => d.order_placed).length
      const payments = data.filter((d) => d.payment_completed).length

      const funnelMetrics = {
        totalVisits,
        productViewRate: ((productViews / totalVisits) * 100).toFixed(1),
        addToCartRate: ((addToCarts / productViews) * 100).toFixed(1),
        orderRate: ((orders / addToCarts) * 100).toFixed(1),
        paymentRate: ((payments / orders) * 100).toFixed(1),
      }

      const prompt =
        query ||
        `Analyze this e-commerce sales funnel data:
    - Total Visits: ${funnelMetrics.totalVisits}
    - Product View Rate: ${funnelMetrics.productViewRate}%
    - Add to Cart Rate: ${funnelMetrics.addToCartRate}%
    - Order Completion Rate: ${funnelMetrics.orderRate}%
    - Payment Success Rate: ${funnelMetrics.paymentRate}%
    
    Provide insights on drop-off points, recommendations for improvement, and business implications.`

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, metrics: funnelMetrics }),
      })

      const result = await response.json()

      if (!response.ok) {
        // If API key is not configured, show demo analysis
        if (result.error?.includes("API key")) {
          setAnalysis(`**🔧 Demo Mode - Sample AI Analysis**

${getDemoAnalysis(query)}

---
*This is a sample analysis. To get real AI-powered insights, please configure your Google Generative AI API key in the API Setup tab.*`)
          return
        }
        throw new Error(result.error || "Analysis failed")
      }

      setAnalysis(result.analysis)
    } catch (error) {
      console.error("Analysis error:", error)

      // Fallback to demo mode for any API errors
      setAnalysis(`**🔧 Demo Mode - Sample AI Analysis**

${getDemoAnalysis(query)}

---
*This is a sample analysis. To get real AI-powered insights, please configure your Google Generative AI API key in the API Setup tab.*`)
    } finally {
      setLoading(false)
    }
  }

  const quickAnalyses = [
    {
      label: "Drop-off Analysis",
      query:
        "Identify the biggest drop-off points in this funnel and explain why users might be leaving at each stage.",
    },
    {
      label: "Conversion Optimization",
      query: "Suggest specific strategies to improve conversion rates at each funnel stage.",
    },
    {
      label: "Business Impact",
      query: "Calculate the potential revenue impact of improving each conversion rate by 10%.",
    },
    {
      label: "Competitive Benchmarks",
      query: "Compare these funnel metrics to industry benchmarks and identify areas for improvement.",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Funnel Analysis
          </CardTitle>
          <CardDescription>
            Get intelligent insights about your sales funnel performance using Gemini AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {quickAnalyses.map((item, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => generateAnalysis(item.query)}
              >
                {item.label}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Ask a custom question about your funnel data..."
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              rows={3}
            />
            <Button
              onClick={() => generateAnalysis(customQuery)}
              disabled={loading || !customQuery.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Custom Query"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{analysis}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <h4 className="font-semibold">Biggest Drop-off</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Product View to Add to Cart stage shows the highest drop-off rate, indicating potential issues with
                product presentation or pricing.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <h4 className="font-semibold">Strong Performance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Payment completion rate is above industry average, suggesting a smooth checkout process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
