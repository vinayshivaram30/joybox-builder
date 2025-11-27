import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS in emails
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[char] || char;
  });
};

interface ReviewNotificationRequest {
  reviewId: string;
  toyName: string;
  rating: number;
  reviewText?: string;
  parentName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reviewId, toyName, rating, reviewText, parentName }: ReviewNotificationRequest = await req.json();

    // Sanitize user inputs
    const safeToyName = escapeHtml(toyName);
    const safeReviewText = escapeHtml(reviewText || '');
    const safeParentName = escapeHtml(parentName);

    console.log("Sending admin notification for review:", reviewId);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get all admin emails
    const { data: admins, error: adminsError } = await supabaseClient
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (adminsError) {
      console.error("Error fetching admins:", adminsError);
      throw adminsError;
    }

    if (!admins || admins.length === 0) {
      console.log("No admins found");
      return new Response(
        JSON.stringify({ message: "No admins to notify" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get admin profiles with emails
    const { data: { users }, error: usersError } = await supabaseClient.auth.admin.listUsers();

    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw usersError;
    }

    const adminEmails = users
      .filter((user) => admins.some((admin) => admin.user_id === user.id))
      .map((user) => user.email)
      .filter((email): email is string => !!email);

    if (adminEmails.length === 0) {
      console.log("No admin emails found");
      return new Response(
        JSON.stringify({ message: "No admin emails found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const stars = "⭐".repeat(rating);
    const reviewUrl = `${Deno.env.get("SUPABASE_URL")?.replace("/rest/v1", "")}/toys/${reviewId}`;

    // Send email to all admins
    const emailPromises = adminEmails.map((email) =>
      resend.emails.send({
        from: "JoyBox Reviews <onboarding@resend.dev>",
        to: [email],
        subject: `New Review Posted: ${safeToyName} (${rating}/5)`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">New Toy Review Posted</h1>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">${safeToyName}</h2>
              <p style="font-size: 24px; margin: 10px 0;">${stars}</p>
              <p><strong>Rating:</strong> ${rating}/5</p>
              <p><strong>Parent:</strong> ${safeParentName}</p>
              ${safeReviewText ? `<p><strong>Review:</strong></p><p>${safeReviewText}</p>` : ""}
            </div>

            <p>This review has been automatically published and is now visible to all users.</p>
            
            <p>If you need to moderate this review, you can:</p>
            <ul>
              <li>View it in the admin dashboard</li>
              <li>Hide it if it violates community guidelines</li>
              <li>Contact the parent directly if needed</li>
            </ul>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px;">
                This is an automated notification from JoyBox. 
                You're receiving this because you're an administrator.
              </p>
            </div>
          </div>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const successCount = results.filter((r) => r.status === "fulfilled").length;

    console.log(`Notification emails sent to ${successCount}/${adminEmails.length} admins`);

    return new Response(
      JSON.stringify({ 
        message: `Notification sent to ${successCount} admin(s)`,
        adminCount: adminEmails.length 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-admin-new-review function:", error);
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
