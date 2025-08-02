import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { prompt, metrics } = await request.json()

    // Check if API key is available
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return Response.json(
        {
          error:
            "Google Generative AI API key is not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables.",
        },
        { status: 500 },
      )
    }

    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: apiKey,
      }),
      prompt: `You are a senior e-commerce analyst. Analyze the following sales funnel data and provide actionable insights:

${prompt}

Additional Context:
- This is for an e-commerce platform similar to Meesho
- Focus on practical, implementable recommendations
- Consider both technical and business perspectives
- Highlight the most critical areas for improvement

Please structure your response with:
1. Key Findings
2. Critical Drop-off Points
3. Optimization Recommendations
4. Expected Business Impact
5. Implementation Priority

Keep the analysis professional but accessible to both technical and business stakeholders.`,
    })

    return Response.json({ analysis: text })
  } catch (error) {
    console.error("Analysis error:", error)

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return Response.json(
          {
            error: "Invalid or missing Google Generative AI API key. Please check your environment configuration.",
          },
          { status: 401 },
        )
      }
      if (error.message.includes("quota") || error.message.includes("limit")) {
        return Response.json(
          {
            error: "API quota exceeded. Please try again later or check your Google AI Studio quota.",
          },
          { status: 429 },
        )
      }
    }

    return Response.json(
      {
        error: "Failed to generate analysis. Please try again or check your API configuration.",
      },
      { status: 500 },
    )
  }
}
