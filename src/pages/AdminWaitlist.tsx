import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, TrendingUp, Users, Target, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistEntry {
  id: string;
  email: string;
  parent_name: string | null;
  child_age: string | null;
  interested_plan: string | null;
  personality_type: string | null;
  phone_number: string | null;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
}

const AdminWaitlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [personalityFilter, setPersonalityFilter] = useState("all");

  useEffect(() => {
    checkAdminAndLoadData();
  }, [user]);

  useEffect(() => {
    filterEntries();
  }, [searchTerm, planFilter, personalityFilter, waitlistEntries]);

  const checkAdminAndLoadData = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check if user is admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleData?.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    await loadWaitlistData();
  };

  const loadWaitlistData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setWaitlistEntries(data || []);
    }
    setLoading(false);
  };

  const filterEntries = () => {
    let filtered = [...waitlistEntries];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.referral_code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Plan filter
    if (planFilter !== "all") {
      filtered = filtered.filter((entry) => entry.interested_plan === planFilter);
    }

    // Personality filter
    if (personalityFilter !== "all") {
      filtered = filtered.filter((entry) => entry.personality_type === personalityFilter);
    }

    setFilteredEntries(filtered);
  };

  const exportToCSV = () => {
    const headers = ["Email", "Name", "Child Age", "Plan", "Personality Type", "Phone", "Referral Code", "Referred By", "Created At"];
    const rows = filteredEntries.map((entry) => [
      entry.email,
      entry.parent_name || "",
      entry.child_age || "",
      entry.interested_plan || "",
      entry.personality_type || "",
      entry.phone_number || "",
      entry.referral_code || "",
      entry.referred_by || "",
      new Date(entry.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `toyluv-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "Export successful",
      description: `Exported ${filteredEntries.length} entries to CSV`,
    });
  };

  // Calculate analytics
  const planCounts = waitlistEntries.reduce((acc, entry) => {
    const plan = entry.interested_plan || "unknown";
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const personalityCounts = waitlistEntries.reduce((acc, entry) => {
    const personality = entry.personality_type || "unknown";
    acc[personality] = (acc[personality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const referralCounts = waitlistEntries.filter((e) => e.referred_by).length;
  const conversionRate = referralCounts > 0 ? ((referralCounts / waitlistEntries.length) * 100).toFixed(1) : "0";

  if (!isAdmin || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Waitlist Dashboard</h1>
          <p className="text-muted-foreground">Manage and analyze your waitlist signups</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waitlistEntries.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">{referralCounts} referred signups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Popular Plan</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} signups
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Personality</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sm">
                {Object.entries(personalityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {Object.entries(personalityCounts).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} signups
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Export */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter & Export</CardTitle>
            <CardDescription>Search and filter waitlist entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, name, or referral code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>

              <Select value={personalityFilter} onValueChange={setPersonalityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by personality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Personalities</SelectItem>
                  {Object.keys(personalityCounts).map((personality) => (
                    <SelectItem key={personality} value={personality}>
                      {personality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={exportToCSV} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Waitlist Table */}
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Entries ({filteredEntries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Plan</th>
                    <th className="text-left p-2">Personality</th>
                    <th className="text-left p-2">Referral Code</th>
                    <th className="text-left p-2">Referred By</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{entry.email}</td>
                      <td className="p-2">{entry.parent_name || "-"}</td>
                      <td className="p-2 capitalize">{entry.interested_plan || "-"}</td>
                      <td className="p-2 text-sm">{entry.personality_type || "-"}</td>
                      <td className="p-2 font-mono text-sm">{entry.referral_code || "-"}</td>
                      <td className="p-2 font-mono text-sm">{entry.referred_by || "-"}</td>
                      <td className="p-2 text-sm">{new Date(entry.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminWaitlist;