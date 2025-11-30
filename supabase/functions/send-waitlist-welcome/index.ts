import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistWelcomeRequest {
  parentName: string;
  email: string;
  interestedPlan?: string;
  personalityType?: string;
  referralCode: string;
  childAge?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      parentName,
      email,
      interestedPlan,
      personalityType,
      referralCode,
      childAge,
    }: WaitlistWelcomeRequest = await req.json();

    console.log("Sending waitlist welcome email to:", email);

    const planDetails = interestedPlan
      ? `<p><strong>Your Selected Plan:</strong> ${interestedPlan}</p>`
      : "";

    const personalityDetails = personalityType
      ? `<p><strong>Your Child's Personality Type:</strong> ${personalityType}</p>`
      : "";

    const childAgeDetails = childAge
      ? `<p><strong>Child's Age:</strong> ${childAge}</p>`
      : "";

    const referralLink = `https://toyluv.lovable.app/?ref=${referralCode}`;

    const emailResponse = await resend.emails.send({
      from: "ToyLuv <onboarding@resend.dev>",
      to: [email],
      subject: "🎁 Welcome to the ToyLuv Exclusive Waitlist!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .referral-box { background: white; border: 2px dashed #667eea; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
              .referral-code { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
              .perks { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
              .perk { margin: 10px 0; padding-left: 25px; position: relative; }
              .perk:before { content: "✓"; position: absolute; left: 0; color: #667eea; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome to ToyLuv!</h1>
                <p>You're on the exclusive waitlist</p>
              </div>
              <div class="content">
                <h2>Hi ${parentName}! 👋</h2>
                <p>Thank you for joining the ToyLuv waitlist! We're thrilled to have you as part of our community.</p>
                
                ${planDetails}
                ${personalityDetails}
                ${childAgeDetails}
                
                <div class="perks">
                  <h3>🎁 Your Early Bird Perks:</h3>
                  <div class="perk">Priority access when we launch</div>
                  <div class="perk">Exclusive 20% discount on your first month</div>
                  <div class="perk">Free trial box upgrade</div>
                  <div class="perk">First pick of premium toys</div>
                </div>

                <div class="referral-box">
                  <h3>🚀 Earn Rewards by Referring Friends!</h3>
                  <p>Share your unique referral code and get amazing rewards:</p>
                  <p class="referral-code">${referralCode}</p>
                  <p><strong>Share your link:</strong></p>
                  <a href="${referralLink}" class="button">Share ToyLuv</a>
                  <p style="font-size: 12px; color: #666; margin-top: 10px;">${referralLink}</p>
                  
                  <div style="margin-top: 20px; text-align: left;">
                    <h4>🎯 Referral Rewards:</h4>
                    <div class="perk">Refer 3 friends → Free extra toy in your first box</div>
                    <div class="perk">Refer 5 friends → 1 month free subscription</div>
                    <div class="perk">Refer 10 friends → 2 months free + VIP status</div>
                  </div>
                </div>

                <h3>What happens next?</h3>
                <p>We'll keep you updated on our launch progress and send you:</p>
                <ul>
                  <li>Early access notifications</li>
                  <li>Exclusive toy curation previews</li>
                  <li>Behind-the-scenes content</li>
                  <li>Special offers and promotions</li>
                </ul>

                <p>Questions? Just reply to this email – we'd love to hear from you!</p>
                
                <p style="margin-top: 30px;">Best regards,<br><strong>The ToyLuv Team</strong> 🧸</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-waitlist-welcome function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);