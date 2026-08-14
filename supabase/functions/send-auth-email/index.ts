import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, otp, name } = await req.json()
    
    const resendKey = Deno.env.get('RESEND_API_KEY')
    if (!resendKey) {
      throw new Error("RESEND_API_KEY is not configured.")
    }

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center;">
            <h1 style="color: #d4af37; margin-bottom: 20px;">AURION AI</h1>
            <p style="font-size: 16px;">Hello ${name || 'there'},</p>
            <p style="font-size: 16px;">Here is your secure authentication code:</p>
            <div style="background-color: #1a1a1a; padding: 20px; border: 1px solid #d4af37; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 30px auto; width: 200px;">
                ${otp}
            </div>
            <p style="font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
        </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`
      },
      body: JSON.stringify({
        from: 'AURION AI <auth@luxfit.ai>',
        to: [email],
        subject: 'Your Login Code | AURION AI',
        html: htmlContent
      })
    })

    if (!res.ok) {
        throw new Error(`Resend API returned ${res.status}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Email error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
