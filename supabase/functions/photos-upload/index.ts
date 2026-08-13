import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { base64Data, contentType } = await req.json()

    // Environment variables provided by Supabase Runtime
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

    // Optional user token forward for RLS
    const authHeader = req.headers.get('Authorization')

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase config missing.')
    }

    // Create client matching the user's auth scope
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader || '' } }
    })

    if (!base64Data) {
        throw new Error('No base64 image data provided.')
    }

    // Decode base64
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Generate unique name
    const timestamp = new Date().getTime()
    const filename = `${timestamp}-uploaded-photo.jpg`

    // Upload to 'user-photos' bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user-photos')
      .upload(filename, byteArray, {
        contentType: contentType || 'image/jpeg',
        upsert: false
      })

    if (uploadError) {
        throw uploadError;
    }

    // Generate signed URL (valid for 1 hour = 3600 seconds)
    const { data: signedData, error: signedError } = await supabase.storage
        .from('user-photos')
        .createSignedUrl(uploadData.path, 3600)

    if (signedError) {
        throw signedError;
    }

    return new Response(JSON.stringify({ 
        path: uploadData.path,
        signedUrl: signedData.signedUrl
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Upload error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
