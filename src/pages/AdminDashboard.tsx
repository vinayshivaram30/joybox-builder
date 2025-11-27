import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Star, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface QuizResult {
  id: string;
  personality_type: string;
  child_age: string;
  parent_name: string;
  created_at: string;
  user_id: string | null;
}

interface UserProfile {
  id: string;
  user_id: string;
  parent_name: string;
  child_age: string | null;
  delivery_address: string | null;
  created_at: string;
}

interface Review {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  is_hidden: boolean;
  hidden_reason: string | null;
  toys: { name: string } | null;
  profiles: { parent_name: string | null } | null;
  review_photos: { id: string; image_url: string }[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [moderateDialogOpen, setModerateDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [hideReason, setHideReason] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setIsAdmin(true);
        fetchAllData();
      } else {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to verify admin status",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  };

  const fetchAllData = async () => {
    try {
      const [quizRes, profilesRes, reviewsRes] = await Promise.all([
        supabase
          .from('quiz_results')
          .select('id, personality_type, child_age, parent_name, created_at, user_id')
          .order('created_at', { ascending: false }),
        supabase
          .from('profiles')
          .select('id, user_id, parent_name, child_age, delivery_address, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('toy_reviews')
          .select(`
            id,
            rating,
            review_text,
            created_at,
            is_hidden,
            hidden_reason,
            user_id,
            toy_id,
            toys (name),
            review_photos (id, image_url)
          `)
          .order('created_at', { ascending: false })
      ]);

      if (quizRes.error) throw quizRes.error;
      if (profilesRes.error) throw profilesRes.error;
      if (reviewsRes.error) throw reviewsRes.error;

      // Fetch profiles for reviews
      const reviewUserIds = reviewsRes.data?.map(r => r.user_id) || [];
      const { data: reviewProfiles } = await supabase
        .from('profiles')
        .select('user_id, parent_name')
        .in('user_id', reviewUserIds);

      const reviewsWithProfiles = reviewsRes.data?.map(review => ({
        ...review,
        profiles: reviewProfiles?.find(p => p.user_id === review.user_id) || null
      })) || [];

      setQuizResults(quizRes.data || []);
      setUsers(profilesRes.data || []);
      setReviews(reviewsWithProfiles);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHideReview = (review: Review) => {
    setSelectedReview(review);
    setHideReason(review.hidden_reason || '');
    setModerateDialogOpen(true);
  };

  const handleToggleReviewVisibility = async () => {
    if (!selectedReview || !user) return;

    try {
      const { error } = await supabase
        .from('toy_reviews')
        .update({
          is_hidden: !selectedReview.is_hidden,
          hidden_reason: selectedReview.is_hidden ? null : hideReason,
          hidden_by: selectedReview.is_hidden ? null : user.id,
          hidden_at: selectedReview.is_hidden ? null : new Date().toISOString(),
        })
        .eq('id', selectedReview.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: selectedReview.is_hidden ? "Review is now visible" : "Review has been hidden",
      });

      setModerateDialogOpen(false);
      setSelectedReview(null);
      setHideReason('');
      fetchAllData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive",
      });
    }
  };

  const getPersonalityStats = () => {
    const stats: { [key: string]: number } = {};
    quizResults.forEach(result => {
      stats[result.personality_type] = (stats[result.personality_type] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) return null;

  const personalityData = getPersonalityStats();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-8">Admin Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{users.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{quizResults.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Personality Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{personalityData.length}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="quiz-results">Quiz Results</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personality Type Distribution</CardTitle>
                  <CardDescription>Overview of personality types from all quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={personalityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personality Type Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={personalityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="hsl(var(--primary))"
                          dataKey="value"
                        >
                          {personalityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Review Moderation</CardTitle>
                  <CardDescription>Manage and moderate user reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className={review.is_hidden ? 'border-destructive' : ''}>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">{review.toys?.name || 'Unknown Toy'}</h3>
                                  {review.is_hidden && (
                                    <Badge variant="destructive">Hidden</Badge>
                                  )}
                                </div>
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
                                  <span className="text-sm text-muted-foreground">
                                    by {review.profiles?.parent_name || 'Anonymous'}
                                  </span>
                                </div>
                                {review.review_text && (
                                  <p className="text-sm text-foreground mb-2">{review.review_text}</p>
                                )}
                                {review.is_hidden && review.hidden_reason && (
                                  <p className="text-sm text-destructive mt-2">
                                    <strong>Hidden reason:</strong> {review.hidden_reason}
                                  </p>
                                )}
                                {review.review_photos && review.review_photos.length > 0 && (
                                  <div className="grid grid-cols-4 gap-2 mt-2">
                                    {review.review_photos.map((photo) => (
                                      <img
                                        key={photo.id}
                                        src={photo.image_url}
                                        alt="Review"
                                        className="w-full h-20 object-cover rounded"
                                      />
                                    ))}
                                  </div>
                                )}
                                <p className="text-xs text-muted-foreground mt-2">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <Button
                                variant={review.is_hidden ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleHideReview(review)}
                              >
                                {review.is_hidden ? (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Unhide
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Hide
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz-results">
              <Card>
                <CardHeader>
                  <CardTitle>All Quiz Results</CardTitle>
                  <CardDescription>Complete history of all quiz submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizResults.map((result) => (
                      <Card key={result.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{result.personality_type}</h3>
                              <p className="text-sm text-muted-foreground">
                                Parent: {result.parent_name} • Age: {result.child_age}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(result.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.user_id ? 'Registered User' : 'Guest'}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{user.parent_name || 'No name'}</h3>
                              <p className="text-sm text-muted-foreground">
                                Child Age: {user.child_age || 'Not set'}
                              </p>
                              {user.delivery_address && (
                                <p className="text-sm text-muted-foreground">
                                  Address: {user.delivery_address}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Joined: {new Date(user.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={moderateDialogOpen} onOpenChange={setModerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedReview?.is_hidden ? 'Unhide Review' : 'Hide Review'}
            </DialogTitle>
            <DialogDescription>
              {selectedReview?.is_hidden
                ? 'This will make the review visible to all users again.'
                : 'This will hide the review from public view. Please provide a reason.'}
            </DialogDescription>
          </DialogHeader>
          {!selectedReview?.is_hidden && (
            <Textarea
              placeholder="Reason for hiding this review..."
              value={hideReason}
              onChange={(e) => setHideReason(e.target.value)}
              rows={3}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModerateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleToggleReviewVisibility}
              disabled={!selectedReview?.is_hidden && !hideReason.trim()}
            >
              {selectedReview?.is_hidden ? 'Unhide' : 'Hide'} Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
