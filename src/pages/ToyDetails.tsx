import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ToyReviewForm } from '@/components/ToyReviewForm';
import { ToyReviews } from '@/components/ToyReviews';
import { ToyRating } from '@/components/ToyRating';

interface Toy {
  id: string;
  name: string;
  description: string | null;
  personality_types: string[];
  age_group: string;
  category: string;
  image_url: string | null;
  stock_quantity: number;
  price: number | null;
}

export default function ToyDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [toy, setToy] = useState<Toy | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({ average: 0, count: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (id) {
      loadToy();
      loadRatings();
    }
  }, [id, refreshKey]);

  const loadToy = async () => {
    try {
      const { data, error } = await supabase
        .from('toys')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setToy(data);
    } catch (error) {
      console.error('Error loading toy:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('toy_ratings_summary')
        .select('average_rating, review_count')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setRatings({
          average: data.average_rating || 0,
          count: Number(data.review_count) || 0,
        });
      }
    } catch (error) {
      console.error('Error loading ratings:', error);
    }
  };

  const handleReviewSubmitted = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!toy) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Toy not found</p>
        <div className="flex justify-center mt-4">
          <Link to="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
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

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          {toy.image_url && (
            <img
              src={toy.image_url}
              alt={toy.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              {toy.name}
            </h1>
            {ratings.count > 0 && (
              <ToyRating rating={ratings.average} reviewCount={ratings.count} size="lg" />
            )}
          </div>

          {toy.description && (
            <p className="text-foreground text-lg">{toy.description}</p>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Age Group:</span>
              <Badge variant="secondary">{toy.age_group}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Category:</span>
              <Badge variant="secondary">{toy.category}</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground">Personality Types:</span>
              {toy.personality_types.map((type) => (
                <Badge key={type} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>
            {toy.price && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Price:</span>
                <span className="text-xl font-bold text-primary">₹{toy.price}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">In Stock:</span>
              <span className={toy.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                {toy.stock_quantity > 0 ? `${toy.stock_quantity} available` : 'Out of stock'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="write-review">Write a Review</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ToyReviews toyId={toy.id} key={refreshKey} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="write-review" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Write Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <ToyReviewForm toyId={toy.id} onReviewSubmitted={handleReviewSubmitted} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Please log in to write a review
                  </p>
                  <Link to="/auth">
                    <Button variant="cta">Log In</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
