import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";
import { api } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = api.login(email, password);
      setLoading(false);
      if (user) {
        login(user);
        toast.success(`Welcome back, ${user.name}!`);
        navigate(user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    }, 600);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-saffron-subtle">
      <ScrollReveal>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border/50 shadow-md w-full max-w-sm space-y-5">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-1">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-[0.97]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Register
            </Link>
          </p>

          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-xs text-muted-foreground text-center font-medium">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted rounded-lg p-2.5">
                <p className="font-medium text-foreground">User</p>
                <p className="text-muted-foreground">ramesh@example.com</p>
                <p className="text-muted-foreground">user123</p>
              </div>
              <div className="bg-muted rounded-lg p-2.5">
                <p className="font-medium text-foreground">Admin</p>
                <p className="text-muted-foreground">admin@temple.com</p>
                <p className="text-muted-foreground">admin123</p>
              </div>
            </div>
          </div>
        </form>
      </ScrollReveal>
    </div>
  );
};

export default Login;
