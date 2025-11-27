import { supabase } from "@/integrations/supabase/client";

export interface RecommendedToy {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  age_group: string;
  category: string;
  price: number | null;
}

/**
 * Get personalized toy recommendations based on personality type
 * @param personalityType The user's personality type from quiz results
 * @param ageGroup Optional age group filter
 * @param limit Number of toys to return (default: 6)
 */
export async function getRecommendedToys(
  personalityType: string,
  ageGroup?: string,
  limit: number = 6
): Promise<RecommendedToy[]> {
  try {
    let query = supabase
      .from("toys")
      .select("id, name, description, image_url, age_group, category, price")
      .contains("personality_types", [personalityType])
      .gt("stock_quantity", 0)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (ageGroup) {
      query = query.eq("age_group", ageGroup);
    }

    const { data, error } = await query.limit(limit);

    if (error) {
      console.error("Error fetching recommended toys:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getRecommendedToys:", error);
    return [];
  }
}

/**
 * Get featured toys across all personality types
 */
export async function getFeaturedToys(limit: number = 6): Promise<RecommendedToy[]> {
  try {
    const { data, error } = await supabase
      .from("toys")
      .select("id, name, description, image_url, age_group, category, price")
      .eq("is_featured", true)
      .gt("stock_quantity", 0)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching featured toys:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getFeaturedToys:", error);
    return [];
  }
}
