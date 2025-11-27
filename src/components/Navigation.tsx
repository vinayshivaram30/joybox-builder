import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .single();

      setIsAdmin(!!data);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading font-bold text-2xl text-primary">
            ToyLuv
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`font-medium transition-colors ${isActive('/features') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className={`font-medium transition-colors ${isActive('/pricing') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Pricing
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/toys">Toy Inventory</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/profile/edit">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/quiz">
                  <Button variant="cta" size="sm">
                    Take Quiz
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/quiz">
                  <Button variant="cta" size="sm">
                    Quiz
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
