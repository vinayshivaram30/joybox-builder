import { useEffect, useState } from 'react';
import { Star, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ReviewPhoto {
  id: string;
  image_url: string;
}

interface Review {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  is_hidden: boolean;
  profiles: {
    parent_name: string | null;
  } | null;
  review_photos: ReviewPhoto[];
  helpful_count?: number;
  unhelpful_count?: number;
  user_vote?: boolean | null;
}

interface ToyReviewsProps {
  toyId: string;
}

export function ToyReviews({ toyId }: ToyReviewsProps) {
  const { user } = useAuth();
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
          is_hidden,
          user_id,
          review_photos (id, image_url)
        `)
        .eq('toy_id', toyId)
        .eq('is_hidden', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch parent names
      const userIds = data?.map(r => r.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, parent_name')
        .in('user_id', userIds);

      // Fetch vote counts and user's votes
      const reviewIds = data?.map(r => r.id) || [];
      const { data: votes } = await supabase
        .from('review_votes')
        .select('review_id, is_helpful, user_id')
        .in('review_id', reviewIds);

      // Calculate vote counts
      const voteCounts = reviewIds.reduce((acc, id) => {
        const reviewVotes = votes?.filter(v => v.review_id === id) || [];
        acc[id] = {
          helpful: reviewVotes.filter(v => v.is_helpful).length,
          unhelpful: reviewVotes.filter(v => !v.is_helpful).length,
          userVote: user ? reviewVotes.find(v => v.user_id === user.id)?.is_helpful : null,
        };
        return acc;
      }, {} as Record<string, { helpful: number; unhelpful: number; userVote?: boolean | null }>);

      // Merge all data
      const reviewsWithData = data?.map(review => ({
        ...review,
        profiles: profiles?.find(p => p.user_id === review.user_id) || null,
        helpful_count: voteCounts[review.id]?.helpful || 0,
        unhelpful_count: voteCounts[review.id]?.unhelpful || 0,
        user_vote: voteCounts[review.id]?.userVote,
      })) || [];

      setReviews(reviewsWithData);
      
      if (reviewsWithData.length > 0) {
        const avg = reviewsWithData.reduce((sum, review) => sum + review.rating, 0) / reviewsWithData.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (reviewId: string, isHelpful: boolean) => {
    if (!user) {
      toast.error('Please log in to vote on reviews');
      return;
    }

    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return;

      // If user already voted the same way, remove the vote
      if (review.user_vote === isHelpful) {
        const { error } = await supabase
          .from('review_votes')
          .delete()
          .eq('review_id', reviewId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Upsert the vote
        const { error } = await supabase
          .from('review_votes')
          .upsert({
            review_id: reviewId,
            user_id: user.id,
            is_helpful: isHelpful,
          }, {
            onConflict: 'review_id,user_id',
          });

        if (error) throw error;
      }

      // Reload reviews to get updated counts
      loadReviews();
    } catch (error) {
      console.error('Error voting on review:', error);
      toast.error('Failed to vote on review');
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
            <CardContent className="space-y-4">
              {review.review_text && (
                <p className="text-foreground">{review.review_text}</p>
              )}

              {review.review_photos && review.review_photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {review.review_photos.map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.image_url}
                      alt="Review photo"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-2 border-t">
                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant={review.user_vote === true ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVote(review.id, true)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {review.helpful_count || 0}
                  </Button>
                  <Button
                    variant={review.user_vote === false ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVote(review.id, false)}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    {review.unhelpful_count || 0}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
