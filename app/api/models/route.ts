import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://models.dev/api.json", {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ModelsApp/1.0)",
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    console.log("Raw API Response keys:", Object.keys(data))

    const processedModels: any[] = []

    if (typeof data === "object" && !Array.isArray(data)) {
      // The API returns providers as top-level keys, each containing a models object
      Object.entries(data).forEach(([providerId, providerData]: [string, any]) => {
        if (providerData?.models && typeof providerData.models === "object") {
          // Extract individual models from each provider
          Object.entries(providerData.models).forEach(([modelId, modelData]: [string, any]) => {
            const processedModel = {
              id: modelId,
              model_id: modelId,
              name: modelData?.name || modelId,
              provider: providerData?.name || providerId,
              provider_id: providerId,

              // Capabilities
              tool_call: modelData?.tool_call || false,
              reasoning: modelData?.reasoning || false,
              attachment: modelData?.attachment || false,
              temperature: modelData?.temperature || false,

              // Metadata
              knowledge: modelData?.knowledge,
              release_date: modelData?.release_date,
              last_updated: modelData?.last_updated,
              open_weights: modelData?.open_weights,

              // Cost structure (convert to per million tokens if needed)
              cost: modelData?.cost
                ? {
                    input: modelData.cost.input,
                    output: modelData.cost.output,
                    cache_read: modelData.cost.cache_read,
                    cache_write: modelData.cost.cache_write,
                  }
                : undefined,

              // Limits
              limit: modelData?.limit
                ? {
                    context: modelData.limit.context,
                    output: modelData.limit.output,
                  }
                : undefined,

              // Modalities
              modalities: modelData?.modalities
                ? {
                    input: modelData.modalities.input,
                    output: modelData.modalities.output,
                  }
                : undefined,

              // Keep original data for debugging
              _raw: modelData,
            }

            processedModels.push(processedModel)
          })
        }
      })
    }

    console.log(`Processed ${processedModels.length} models from ${Object.keys(data).length} providers`)
    console.log("Sample processed model:", JSON.stringify(processedModels[0], null, 2))

    return NextResponse.json({
      success: true,
      data: processedModels,
      count: processedModels.length,
      timestamp: new Date().toISOString(),
      debug: {
        providersCount: Object.keys(data).length,
        providers: Object.keys(data),
        sampleProvider: Object.keys(data)[0],
        sampleModel: processedModels[0],
      },
    })
  } catch (error) {
    console.error("API proxy error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        data: [],
        count: 0,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
