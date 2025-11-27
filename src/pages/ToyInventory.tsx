import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const PERSONALITY_TYPES = ["Explorer", "Creator", "Thinker", "Socializer"];
const AGE_GROUPS = ["0-2 years", "3-5 years", "6-8 years", "9-12 years"];
const CATEGORIES = ["Educational", "Creative", "Active Play", "STEM", "Arts & Crafts", "Puzzles", "Building", "Outdoor"];

const ToyInventory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [toys, setToys] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingToy, setEditingToy] = useState<Toy | null>(null);
  const [filterPersonality, setFilterPersonality] = useState<string>("all");
  const [filterAgeGroup, setFilterAgeGroup] = useState<string>("all");
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    personality_types: [] as string[],
    age_group: "",
    category: "",
    image_url: "",
    stock_quantity: 0,
    price: 0,
    is_featured: false,
  });

  useEffect(() => {
    checkAdminAccess();
    fetchToys();
  }, []);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  };

  const fetchToys = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("toys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching toys",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setToys(data || []);
    }
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image_url || null;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("toy-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("toy-images").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age_group || !formData.category || formData.personality_types.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const uploadedImageUrl = await uploadImage();

    const toyData = {
      ...formData,
      price: formData.price || null,
      image_url: uploadedImageUrl,
      description: formData.description || null,
    };

    if (editingToy) {
      const { error } = await supabase
        .from("toys")
        .update(toyData)
        .eq("id", editingToy.id);

      if (error) {
        toast({
          title: "Error updating toy",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Toy updated successfully.",
        });
        setDialogOpen(false);
        resetForm();
        fetchToys();
      }
    } else {
      const { error } = await supabase.from("toys").insert(toyData);

      if (error) {
        toast({
          title: "Error adding toy",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Toy added successfully.",
        });
        setDialogOpen(false);
        resetForm();
        fetchToys();
      }
    }
  };

  const handleEdit = (toy: Toy) => {
    setEditingToy(toy);
    setFormData({
      name: toy.name,
      description: toy.description || "",
      personality_types: toy.personality_types,
      age_group: toy.age_group,
      category: toy.category,
      image_url: toy.image_url || "",
      stock_quantity: toy.stock_quantity,
      price: toy.price || 0,
      is_featured: toy.is_featured,
    });
    setImagePreview(toy.image_url || "");
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this toy?")) return;

    const { error } = await supabase.from("toys").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting toy",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Toy deleted successfully.",
      });
      fetchToys();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      personality_types: [],
      age_group: "",
      category: "",
      image_url: "",
      stock_quantity: 0,
      price: 0,
      is_featured: false,
    });
    setEditingToy(null);
    setImageFile(null);
    setImagePreview("");
  };

  const togglePersonalityType = (type: string) => {
    setFormData({
      ...formData,
      personality_types: formData.personality_types.includes(type)
        ? formData.personality_types.filter((t) => t !== type)
        : [...formData.personality_types, type],
    });
  };

  const filteredToys = toys.filter((toy) => {
    const personalityMatch = filterPersonality === "all" || toy.personality_types.includes(filterPersonality);
    const ageMatch = filterAgeGroup === "all" || toy.age_group === filterAgeGroup;
    return personalityMatch && ageMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Toy Inventory Management</h1>
          <p className="text-muted-foreground mt-2">Manage toys by personality type and age group</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="cta" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Add New Toy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingToy ? "Edit Toy" : "Add New Toy"}</DialogTitle>
              <DialogDescription>
                {editingToy ? "Update toy details" : "Add a new toy to the inventory"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Toy Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Personality Types * (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {PERSONALITY_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`personality-${type}`}
                        checked={formData.personality_types.includes(type)}
                        onCheckedChange={() => togglePersonalityType(type)}
                      />
                      <Label htmlFor={`personality-${type}`} className="cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age_group">Age Group *</Label>
                  <Select
                    value={formData.age_group}
                    onValueChange={(value) => setFormData({ ...formData, age_group: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_GROUPS.map((age) => (
                        <SelectItem key={age} value={age}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Toy Image</Label>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImagePreview("");
                          setImageFile(null);
                          setFormData({ ...formData, image_url: "" });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        id="image_file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload an image (max 5MB)
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">or</div>
                  <div>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        setImagePreview(e.target.value);
                        setImageFile(null);
                      }}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                />
                <Label htmlFor="is_featured" className="cursor-pointer">
                  Featured Toy
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="cta" className="flex-1" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-pulse" />
                      Uploading...
                    </>
                  ) : (
                    <>{editingToy ? "Update Toy" : "Add Toy"}</>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={filterPersonality} onValueChange={setFilterPersonality}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by personality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Personalities</SelectItem>
            {PERSONALITY_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterAgeGroup} onValueChange={setFilterAgeGroup}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by age group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Age Groups</SelectItem>
            {AGE_GROUPS.map((age) => (
              <SelectItem key={age} value={age}>
                {age}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Toys Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading toys...</p>
        </div>
      ) : filteredToys.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No toys found. Add your first toy to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToys.map((toy) => (
            <Card key={toy.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {toy.image_url && (
                <div className="h-48 overflow-hidden bg-muted">
                  <img src={toy.image_url} alt={toy.name} className="w-full h-full object-cover" />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{toy.name}</CardTitle>
                  {toy.is_featured && (
                    <Badge variant="default" className="bg-primary">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">{toy.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Personality Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {toy.personality_types.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Age Group:</p>
                      <p className="font-semibold">{toy.age_group}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category:</p>
                      <p className="font-semibold">{toy.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stock:</p>
                      <p className="font-semibold">{toy.stock_quantity}</p>
                    </div>
                    {toy.price && (
                      <div>
                        <p className="text-muted-foreground">Price:</p>
                        <p className="font-semibold">₹{toy.price}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(toy)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(toy.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToyInventory;
