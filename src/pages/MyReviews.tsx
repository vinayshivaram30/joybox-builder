import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Loader2, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface ReviewPhoto {
  id: string;
  image_url: string;
}

interface Review {
  id: string;
  toy_id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  is_hidden: boolean;
  toys: {
    name: string;
    image_url: string | null;
  } | null;
  review_photos: ReviewPhoto[];
}

export default function MyReviews() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadReviews();
  }, [user, navigate]);

  const loadReviews = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('toy_reviews')
        .select(`
          id,
          toy_id,
          rating,
          review_text,
          created_at,
          is_hidden,
          toys (name, image_url),
          review_photos (id, image_url)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    try {
      const { error } = await supabase
        .from('toy_reviews')
        .delete()
        .eq('id', reviewToDelete);

      if (error) throw error;

      toast.success('Review deleted successfully');
      loadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/dashboard">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          My Reviews
        </h1>
        <p className="text-muted-foreground">
          Manage all your toy reviews in one place
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-muted-foreground mb-4">
              You haven't written any reviews yet
            </p>
            <Link to="/dashboard">
              <Button variant="cta">Browse Toys</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    {review.toys?.image_url && (
                      <img
                        src={review.toys.image_url}
                        alt={review.toys.name || 'Toy'}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {review.toys?.name || 'Unknown Toy'}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
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
                        {review.is_hidden && (
                          <Badge variant="destructive">Hidden by Admin</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/toys/${review.toy_id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(review.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {review.review_text && (
                  <p className="text-foreground">{review.review_text}</p>
                )}

                {review.review_photos && review.review_photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
