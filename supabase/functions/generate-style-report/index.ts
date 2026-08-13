import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { profileData } = await req.json()
    
    // Retrieve the Groq API key from Supabase Edge Function secrets
    const groqKey = Deno.env.get('GROQ_API_KEY')
    if (!groqKey) {
      throw new Error("GROQ_API_KEY is not configured.")
    }

    const systemPrompt = `You are a World-Class Professional Fashion Designer with 15+ years of experience in luxury styling. 
You are given a client's profile: gender, body type, skin tone, hair color, height, occasion, season, and budget.
Generate a highly structured JSON response with exactly 10 keys:
1. "style_profile_summary" (text)
2. "skin_tone_analysis" (object: undertone, season_type, metal_preference)
3. "body_type_analysis" (object: strengths, styling_focus, fit_tips array)
4. "color_strategy" (object: core_colors array, accent_colors array, combos array)
5. "best_colors" (array of objects: name, hex, how_to_wear)
6. "colors_to_avoid" (array of objects: name, alternative)
7. "best_patterns" (array of strings)
8. "signature_looks" (array of objects: outfit_name, key_pieces array)
9. "essential_wardrobe_checklist" (array of strings)
10. "budget_strategy" (object: invest_in array, save_on array)

Output ONLY valid JSON. Do not include markdown codeblocks or surrounding text.`

    const userPrompt = `Client Profile: ${JSON.stringify(profileData)}`

    // Call Groq API via standard OpenAI-compatible endpoint
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2, // Keep temperature low to ensure strict JSON adherence
        response_format: { type: "json_object" }
      })
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Groq API Error:", errorText);
        throw new Error(`Groq API returned ${response.status}`);
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    let parsedResult;
    try {
      parsedResult = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse Groq response as JSON:", content);
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
