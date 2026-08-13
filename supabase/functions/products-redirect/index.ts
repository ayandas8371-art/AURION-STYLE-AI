import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const productId = url.searchParams.get('product_id')
    const targetUrl = url.searchParams.get('to')
    
    if (!productId || !targetUrl) {
        return new Response('Missing target parameters.', { status: 400 })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        
        // Log the analytic click via service role
        await supabase.from('affiliate_clicks').insert({
            product_id: productId,
            affiliate_url: targetUrl,
            user_agent: req.headers.get('user-agent') || 'unknown',
            ip_address: req.headers.get('x-forwarded-for') || 'unknown',
            referrer: req.headers.get('referer') || 'unknown'
        })
    }

    // Perform the 302 Redirect to the actual shopping page
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, 'Location': targetUrl },
    })

  } catch (error) {
    console.error("Redirect error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    })
  }
})
