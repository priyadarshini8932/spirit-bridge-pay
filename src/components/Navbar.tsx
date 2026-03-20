import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/60 shadow-sm">
      <div className="container-temple flex items-center justify-between h-16 md:h-18">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg md:text-2xl font-display font-bold text-gradient-saffron leading-tight">
            Sri Sri Radha Krishnachandra
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href
                      ? "text-primary bg-saffron-light/60"
                      : "text-foreground/70 hover:text-primary hover:bg-saffron-light/40"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth buttons */}
          <div className="ml-2 pl-2 border-l border-border/60 flex items-center gap-1.5">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-saffron-light/40 transition-colors active:scale-[0.97]"
                >
                  <div className="w-6 h-6 rounded-full bg-saffron-light flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  {user?.name?.split(" ")[0]}
                </button>

                {userMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-card rounded-lg border border-border shadow-lg z-50 py-1 animate-scale-in origin-top-right">
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <Link
                        to={isAdmin ? "/admin" : "/dashboard"}
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:bg-muted transition-colors"
                      >
                        {isAdmin ? <Shield size={14} /> : <LayoutDashboard size={14} />}
                        {isAdmin ? "Admin Panel" : "Dashboard"}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/dashboard"
                          onClick={() => setUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:bg-muted transition-colors"
                        >
                          <LayoutDashboard size={14} />
                          My Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-saffron-light/40 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors active:scale-95"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <ul className="py-3 px-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary bg-saffron-light/60"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border pt-2 mt-2">
              {isLoggedIn ? (
                <div className="space-y-1">
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground/70 hover:text-primary"
                  >
                    {isAdmin ? "Admin Panel" : "Dashboard"}
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setOpen(false); }}
                    className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-muted"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground/70 hover:text-primary">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-primary">
                    Register
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
