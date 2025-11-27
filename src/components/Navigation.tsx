import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { LogOut, User, Home as HomeIcon, Info, DollarSign } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DynamicNavigation } from "@/components/DynamicNavigation";
import { AuroraTextEffect } from "@/components/ui/aurora-text-effect";
export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    signOut
  } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigationLinks = [{
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon size={14} />
  }, {
    id: 'features',
    label: 'How It Works',
    href: '/features',
    icon: <Info size={14} />
  }, {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing',
    icon: <DollarSign size={14} />
  }];
  const getActiveLink = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/features') return 'features';
    if (location.pathname === '/pricing') return 'pricing';
    return 'home';
  };
  const handleNavLinkClick = (id: string) => {
    const link = navigationLinks.find(l => l.id === id);
    if (link) {
      navigate(link.href);
    }
  };
  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);
  const checkAdminStatus = async () => {
    try {
      const {
        data
      } = await supabase.from('user_roles').select('role').eq('user_id', user?.id).eq('role', 'admin').single();
      setIsAdmin(!!data);
    } catch (error) {
      setIsAdmin(false);
    }
  };
  const handleSignOut = async () => {
    await signOut();
  };
  return <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="h-16 gap-4 flex items-center justify-between bg-stone-200 text-stone-400 border-muted">
          <Link to="/" className="block">
            <AuroraTextEffect text="ToyLuv" className="bg-transparent dark:bg-transparent h-10 w-[120px] rounded-lg" textClassName="font-heading font-bold" fontSize="1.5rem" colors={{
            first: "bg-primary/40",
            second: "bg-secondary/40",
            third: "bg-accent/40",
            fourth: "bg-primary/30"
          }} blurAmount="blur-md" animationSpeed={{
            border: 8,
            first: 6,
            second: 7,
            third: 5,
            fourth: 10
          }} />
          </Link>
          
          {/* Desktop Navigation with DynamicNavigation */}
          <div className="hidden items-center flex-1 justify-center max-w-md md:flex md:items-center md:justify-end gap-px">
            <DynamicNavigation links={navigationLinks} activeLink={getActiveLink()} onLinkClick={handleNavLinkClick} showLabelsOnMobile={false} className="w-full" />
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? <>
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
                    {isAdmin && <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/toys">Toy Inventory</Link>
                        </DropdownMenuItem>
                      </>}
                    <DropdownMenuItem asChild>
                      <Link to="/profile/edit">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </> : <>
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
              </>}
          </div>
          
          {/* Mobile Auth Buttons */}
          <div className="md:hidden flex items-center gap-2">
            {user ? <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </> : <>
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
              </>}
          </div>
        </div>
        
        {/* Mobile Navigation with DynamicNavigation */}
        <div className="md:hidden pb-3">
          <DynamicNavigation links={navigationLinks} activeLink={getActiveLink()} onLinkClick={handleNavLinkClick} showLabelsOnMobile={true} className="w-full" />
        </div>
      </div>
    </nav>;
};