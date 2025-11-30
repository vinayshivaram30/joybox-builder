# WhatsApp Business API Integration Guide

## Overview
This guide will help you integrate the WhatsApp Business API with your ToyLuv application for customer support.

## Current Setup
Your app currently uses the basic WhatsApp redirect (`wa.me` links) which opens WhatsApp with a pre-filled message. For production use, you'll want to upgrade to the official WhatsApp Business API.

## WhatsApp Business API Options

### 1. WhatsApp Business Platform (Official - Recommended)
**Best for:** Scalable, professional customer engagement

**Steps to Get Started:**
1. **Create a Meta Business Account**
   - Visit: https://business.facebook.com/
   - Set up your business profile

2. **Apply for WhatsApp Business API Access**
   - Go to: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
   - Navigate to WhatsApp > Getting Started
   - Follow the setup wizard

3. **Get Your Credentials**
   - Phone Number ID
   - WhatsApp Business Account ID
   - Access Token

4. **Webhook Setup**
   - You'll need to set up a webhook endpoint to receive messages
   - Use Supabase Edge Functions for this

**Pricing:**
- Free: 1,000 conversations/month
- Paid: $0.005-0.02 per conversation (varies by country)
- India rates are typically lower

### 2. WhatsApp Business Solution Providers (BSPs)
**Easier setup, managed services:**

#### Twilio
- Website: https://www.twilio.com/whatsapp
- Easy integration with SDKs
- Pay-as-you-go pricing
- Great documentation

#### MessageBird
- Website: https://messagebird.com/whatsapp-business-api
- Good for international businesses
- Competitive pricing

#### Gupshup
- Website: https://www.gupshup.io/whatsapp-business-api
- Popular in India
- Good local support

## Implementation Example (Meta WhatsApp Cloud API)

### Step 1: Set up Edge Function for Receiving Messages

Create `supabase/functions/whatsapp-webhook/index.ts`:

\`\`\`typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Verify webhook (GET request from WhatsApp)
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');
    
    const VERIFY_TOKEN = Deno.env.get('WHATSAPP_VERIFY_TOKEN');
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    
    return new Response('Forbidden', { status: 403 });
  }
  
  // Handle incoming messages (POST request)
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      
      // Extract message details
      const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      
      if (message) {
        const from = message.from;
        const text = message.text?.body;
        const messageId = message.id;
        
        console.log(\`Received message from \${from}: \${text}\`);
        
        // Store message in database or trigger AI response
        // You can integrate with your AI chat here
        
        // Send auto-reply
        await sendWhatsAppMessage(from, "Thank you for contacting ToyLuv! Our team will respond shortly.");
      }
      
      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  
  return new Response('Method Not Allowed', { status: 405 });
});

async function sendWhatsAppMessage(to: string, message: string) {
  const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
  const PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
  
  await fetch(\`https://graph.facebook.com/v18.0/\${PHONE_NUMBER_ID}/messages\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${WHATSAPP_TOKEN}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      text: { body: message }
    })
  });
}
\`\`\`

### Step 2: Configure Secrets in Supabase

You'll need to add these secrets:
- `WHATSAPP_ACCESS_TOKEN` - From Meta Business
- `WHATSAPP_PHONE_NUMBER_ID` - From WhatsApp Business account
- `WHATSAPP_VERIFY_TOKEN` - Create your own secure token

### Step 3: Update config.toml

\`\`\`toml
[functions.whatsapp-webhook]
verify_jwt = false
\`\`\`

### Step 4: Set up Webhook in Meta Dashboard

1. Go to your WhatsApp app in Meta for Developers
2. Navigate to Configuration > Webhook
3. Add your webhook URL:
   \`https://ruseqikdkaqwbuvifhcd.supabase.co/functions/v1/whatsapp-webhook\`
4. Add your verify token
5. Subscribe to message events

## Features You Can Build

### 1. Auto-Responses
- Instant replies to common queries
- Business hours notifications
- Order confirmations

### 2. AI Integration
- Connect your AI chatbot to WhatsApp
- Provide intelligent responses
- Escalate to human agents when needed

### 3. Rich Media
- Send images of toys
- Product catalogs
- Order tracking updates

### 4. Templates
- Pre-approved message templates
- Order confirmations
- Delivery updates
- Promotional messages

## Best Practices

1. **Response Time**
   - Aim to respond within 24 hours
   - Use auto-replies for immediate acknowledgment

2. **Message Templates**
   - Get templates approved by WhatsApp
   - Use for notifications and promotions

3. **Customer Privacy**
   - Store minimal customer data
   - Comply with WhatsApp's privacy policies

4. **Rate Limits**
   - Start with lower tier limits
   - Scale as you grow

## Next Steps

1. ✅ Current: Basic wa.me links (what you have now)
2. 📝 Sign up for WhatsApp Business API
3. 🔧 Implement webhook edge function
4. 🤖 Connect AI chatbot to WhatsApp
5. 📊 Add analytics and monitoring

## Resources

- [WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [WhatsApp Business API Pricing](https://developers.facebook.com/docs/whatsapp/pricing)
- [Meta Business Setup](https://business.facebook.com/)
- [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp)

## Support

For questions about implementation:
- Meta Developer Community: https://developers.facebook.com/community/
- Supabase Discord: https://discord.supabase.com/

---

**Note:** Update the phone number `1234567890` in `WhatsAppWidget.tsx` with your actual WhatsApp Business number once you have it set up.
