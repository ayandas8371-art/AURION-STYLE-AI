import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()
    
    const groqKey = Deno.env.get('GROQ_API_KEY')
    if (!groqKey) {
      throw new Error("GROQ_API_KEY is not configured.")
    }

    const systemPrompt = `You are StyleAI, the floating fashion assistant for AURION AI.
You are a top-tier luxury fashion designer and stylist. Be conversational, elegant, very helpful, and concise.
You answer questions regarding fashion, fit, body types, clothing combinations, and color harmony.
You decline to answer questions completely unrelated to fashion, clothing, or the AURION AI app interface.`

    // Validate messages array
    if (!Array.isArray(messages)) {
      throw new Error("Invalid messages payload format.")
    }

    // Prepend the system prompt to the conversation history
    const payloadMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ]

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai-oss-120b',
        messages: payloadMessages,
        temperature: 0.7, // Allow more creativity for chat
      })
    })

    if (!response.ok) {
        throw new Error(`Groq API returned ${response.status}`);
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    return new Response(JSON.stringify({ reply: content }), {
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
