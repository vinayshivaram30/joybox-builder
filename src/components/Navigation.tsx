import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User, Home as HomeIcon, Info, IndianRupee } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DynamicNavigation } from "@/components/DynamicNavigation";
import logoSvg from "@/assets/toyluv-logo.svg";
export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigationLinks = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: <HomeIcon size={14} />,
    },
    {
      id: "features",
      label: "How It Works",
      href: "/features",
      icon: <Info size={14} />,
    },
    {
      id: "pricing",
      label: "Pricing",
      href: "/pricing",
      icon: <IndianRupee size={14} />,
    },
  ];
  const getActiveLink = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/features") return "features";
    if (location.pathname === "/pricing") return "pricing";
    return "home";
  };
  const handleNavLinkClick = (id: string) => {
    const link = navigationLinks.find((l) => l.id === id);
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
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user?.id)
        .eq("role", "admin")
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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        <div className="h-16 sm:h-20 gap-2 sm:gap-4 items-center justify-between flex flex-row">
          <Link to="/" className="block hover:opacity-80 transition-opacity flex-shrink-0">
            <img 
              src={logoSvg} 
              alt="ToyLuv Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
              width="133"
              height="40"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation and Auth Buttons */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-4">
            <DynamicNavigation
              links={navigationLinks}
              activeLink={getActiveLink()}
              onLinkClick={handleNavLinkClick}
              showLabelsOnMobile={false}
              className="max-w-md"
            />
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

          {/* Mobile Auth Buttons */}
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

        {/* Mobile Navigation with DynamicNavigation */}
        <div className="md:hidden pb-3">
          <DynamicNavigation
            links={navigationLinks}
            activeLink={getActiveLink()}
            onLinkClick={handleNavLinkClick}
            showLabelsOnMobile={true}
            className="w-full"
          />
        </div>
      </div>
    </nav>
  );
};
