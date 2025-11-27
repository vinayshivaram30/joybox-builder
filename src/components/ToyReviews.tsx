import { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Review {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  profiles: {
    parent_name: string | null;
  } | null;
}

interface ToyReviewsProps {
  toyId: string;
}

export function ToyReviews({ toyId }: ToyReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    loadReviews();
  }, [toyId]);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('toy_reviews')
        .select(`
          id,
          rating,
          review_text,
          created_at,
          user_id
        `)
        .eq('toy_id', toyId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch parent names separately
      const userIds = data?.map(r => r.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, parent_name')
        .in('user_id', userIds);

      // Merge profiles with reviews
      const reviewsWithProfiles = data?.map(review => ({
        ...review,
        profiles: profiles?.find(p => p.user_id === review.user_id) || null
      })) || [];

      setReviews(reviewsWithProfiles);
      
      if (reviewsWithProfiles.length > 0) {
        const avg = reviewsWithProfiles.reduce((sum, review) => sum + review.rating, 0) / reviewsWithProfiles.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review this toy!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-primary text-primary" />
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
        </div>
        <div className="text-muted-foreground">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {review.profiles?.parent_name?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {review.profiles?.parent_name || 'Anonymous'}
                    </CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-primary text-primary'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            {review.review_text && (
              <CardContent>
                <p className="text-foreground">{review.review_text}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
