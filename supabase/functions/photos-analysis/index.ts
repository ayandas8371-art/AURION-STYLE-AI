import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { photoUrl } = await req.json()
    
    // Retrieve API Key
    const geminiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiKey) {
      throw new Error("GEMINI_API_KEY is not configured.")
    }

    // Step 1: We must fetch the actual image bytes to send to Gemini
    const imageRes = await fetch(photoUrl);
    if (!imageRes.ok) {
        throw new Error("Failed to download image from provided URL");
    }
    const arrayBuffer = await imageRes.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    // Step 2: Construct the Gemini API payload
    const systemInstruction = `You are a World-Class Professional Fashion Analyst. 
Analyze the provided human photo and extract:
1. "body_type" (string: Hourglass, Pear, Rectangle, Inverted Triangle, Apple)
2. "skin_tone" (string: Fair, Medium, Olive, Deep)
3. "hair_color" (string)
4. "recommended_colors" (array of hex codes)
5. "avoid_colors" (array of hex codes)

You must return a single, strictly formatted JSON object.`

    const payload = {
      contents: [{
        parts: [
          { text: systemInstruction },
          {
            inlineData: {
              mimeType: imageRes.headers.get('content-type') || 'image/jpeg',
              data: base64Image
            }
          }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1
      }
    };

    // Call Google Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json()
    
    // Parse Gemini's JSON
    const textContent = data.candidates[0].content.parts[0].text;
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(textContent);
    } catch (e) {
      throw new Error("Gemini returned malformed JSON");
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
