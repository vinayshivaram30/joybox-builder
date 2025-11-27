import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuizEmailRequest {
  parentName: string;
  email: string;
  personalityType: string;
  childAge: string;
}

const getToyRecommendations = (personalityType: string, childAge: string) => {
  const recommendations: Record<string, { title: string; toys: string[] }> = {
    explorer: {
      title: "Adventure & Discovery Toys",
      toys: [
        "Nature exploration kit with magnifying glass and bug catcher",
        "Interactive world map puzzle",
        "Science experiment sets",
        "Outdoor adventure backpack with compass"
      ]
    },
    creator: {
      title: "Arts & Crafts Toys",
      toys: [
        "Premium art supply set with various mediums",
        "Building blocks and construction sets",
        "Clay modeling and sculpting kit",
        "DIY craft project boxes"
      ]
    },
    thinker: {
      title: "Educational & Logic Toys",
      toys: [
        "Age-appropriate STEM learning kits",
        "Logic puzzles and brain teasers",
        "Educational board games",
        "Coding and robotics starter sets"
      ]
    },
    socializer: {
      title: "Interactive & Group Play Toys",
      toys: [
        "Cooperative board games for families",
        "Role-playing costume sets",
        "Musical instruments for group play",
        "Interactive storytelling games"
      ]
    }
  };

  return recommendations[personalityType.toLowerCase()] || recommendations.explorer;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { parentName, email, personalityType, childAge }: QuizEmailRequest = await req.json();

    console.log("Sending quiz completion email to:", email);

    const recommendations = getToyRecommendations(personalityType, childAge);

    const emailResponse = await resend.emails.send({
      from: "JoyBox <onboarding@resend.dev>",
      to: [email],
      subject: `${parentName}, Your Child's Personality Profile is Ready! 🎁`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9fafb;
              }
              .container {
                background-color: white;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .header h1 {
                color: #8B5CF6;
                font-size: 28px;
                margin-bottom: 10px;
              }
              .personality-badge {
                background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
                color: white;
                padding: 15px 30px;
                border-radius: 50px;
                display: inline-block;
                font-size: 20px;
                font-weight: bold;
                margin: 20px 0;
              }
              .section {
                margin: 30px 0;
              }
              .section h2 {
                color: #1f2937;
                font-size: 22px;
                margin-bottom: 15px;
              }
              .toy-list {
                background-color: #f3f4f6;
                border-radius: 8px;
                padding: 20px;
                margin-top: 15px;
              }
              .toy-item {
                padding: 10px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .toy-item:last-child {
                border-bottom: none;
              }
              .toy-item:before {
                content: "🎁 ";
                margin-right: 10px;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
                color: white;
                padding: 15px 40px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Quiz Results Are In!</h1>
                <p>Hi ${parentName},</p>
                <p>We've analyzed your responses and discovered your child's personality type!</p>
              </div>

              <div style="text-align: center;">
                <div class="personality-badge">
                  ${personalityType.toUpperCase()}
                </div>
              </div>

              <div class="section">
                <h2>Personalized Toy Recommendations</h2>
                <p>Based on your child's <strong>${personalityType}</strong> personality and age (${childAge}), we've curated these perfect toy selections:</p>
                
                <div class="toy-list">
                  <h3 style="margin-top: 0; color: #8B5CF6;">${recommendations.title}</h3>
                  ${recommendations.toys.map(toy => `<div class="toy-item">${toy}</div>`).join('')}
                </div>
              </div>

              <div class="section">
                <h2>What Makes These Perfect?</h2>
                <p>Each toy in your personalized box is specifically chosen to:</p>
                <ul style="color: #4b5563;">
                  <li>Match your child's natural interests and play style</li>
                  <li>Support their developmental stage</li>
                  <li>Encourage learning through play</li>
                  <li>Provide hours of engaging entertainment</li>
                </ul>
              </div>

              <div style="text-align: center;">
                <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovable.app') || 'https://your-app.lovable.app'}/pricing" class="cta-button">
                  View Subscription Plans
                </a>
                <p style="margin-top: 10px; color: #6b7280;">Start your monthly JoyBox subscription today!</p>
              </div>

              <div class="footer">
                <p><strong>JoyBox</strong> - Curated toys that grow with your child</p>
                <p>Questions? Reply to this email, we'd love to hear from you!</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quiz-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
