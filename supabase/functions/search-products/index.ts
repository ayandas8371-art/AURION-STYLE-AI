import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { styleData, budgetMax, occasion, gender } = await req.json()
    
    // Retrieve the Perplexity API key
    const perpKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perpKey) {
      throw new Error("PERPLEXITY_API_KEY is not configured.")
    }

    const systemPrompt = `You are a real-time e-commerce fashion assistant. 
Your task is to search live Indian e-commerce websites (Amazon India, Myntra, Ajio, Tata CLiQ) for exact products that match the user's generated style guidelines.
Strictly adhere to the user's gender, occasion, and max budget of ₹${budgetMax}.
Return a strict JSON array of objects representing products. Each object MUST have:
"name" (string), "brand" (string), "price" (number in INR), "discounted_price" (number in INR), "image_url" (string URL of product), "store_url" (string URL to buy), "store" (string e.g. "Myntra"), "rating" (number 1-5).
Return ONLY the JSON array. Make sure the URLs are valid format.`

    const userPrompt = `Find 4 distinct fashion products (e.g. top, bottom, shoes, accessory) matching this Style Profile: ${JSON.stringify(styleData)}`

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perpKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2
      })
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Perplexity API Error:", errorText);
        throw new Error(`Perplexity API returned ${response.status}`);
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Perplexity might wrap json in markdown block, so strip it
    const jsonString = content.replace(/```json\n?|\n?```/g, '').trim();

    let parsedResult;
    try {
      parsedResult = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse Perplexity response as JSON:", jsonString);
      throw new Error("AI returned malformed JSON");
    }

    return new Response(JSON.stringify(parsedResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Function error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
