import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  review_text: z.string().trim().max(1000, { message: "Review must be less than 1000 characters" }).optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ToyReviewFormProps {
  toyId: string;
  onReviewSubmitted?: () => void;
}

export function ToyReviewForm({ toyId, onReviewSubmitted }: ToyReviewFormProps) {
  const { user } = useAuth();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      review_text: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 5) {
      toast.error('You can upload up to 5 images per review');
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      return true;
    });

    setImageFiles(prev => [...prev, ...validFiles]);
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (reviewId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}/${reviewId}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('review-photos')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from('review-photos')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      toast.error('Please log in to submit a review');
      return;
    }

    setIsSubmitting(true);
    try {
      // Insert review
      const { data: reviewData, error: reviewError } = await supabase
        .from('toy_reviews')
        .insert({
          toy_id: toyId,
          user_id: user.id,
          rating: data.rating,
          review_text: data.review_text || null,
        })
        .select()
        .single();

      if (reviewError) throw reviewError;

      // Upload images if any
      if (imageFiles.length > 0) {
        const imageUrls = await uploadImages(reviewData.id);
        
        // Insert image records
        const photoInserts = imageUrls.map(url => ({
          review_id: reviewData.id,
          image_url: url,
        }));

        const { error: photosError } = await supabase
          .from('review_photos')
          .insert(photoInserts);

        if (photosError) {
          console.error('Error saving photo records:', photosError);
        }
      }

      // Get toy name and parent name for email notification
      const { data: toyData } = await supabase
        .from('toys')
        .select('name')
        .eq('id', toyId)
        .single();

      const { data: profileData } = await supabase
        .from('profiles')
        .select('parent_name')
        .eq('user_id', user.id)
        .single();

      // Send admin notification
      try {
        await supabase.functions.invoke('notify-admin-new-review', {
          body: {
            reviewId: reviewData.id,
            toyName: toyData?.name || 'Unknown Toy',
            rating: data.rating,
            reviewText: data.review_text,
            parentName: profileData?.parent_name || 'Anonymous',
          },
        });
      } catch (emailError) {
        console.error('Error sending admin notification:', emailError);
        // Don't fail the review submission if email fails
      }

      toast.success('Review submitted successfully!');
      form.reset();
      setImageFiles([]);
      setImagePreviews([]);
      onReviewSubmitted?.();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      if (error.code === '23505') {
        toast.error('You have already reviewed this toy');
      } else {
        toast.error('Failed to submit review');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const rating = form.watch('rating');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="review_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts about this toy..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Photos (Optional)</FormLabel>
          <FormDescription>Upload up to 5 photos (max 5MB each)</FormDescription>
          
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {imagePreviews.length < 5 && (
            <div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting || rating === 0}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
}
