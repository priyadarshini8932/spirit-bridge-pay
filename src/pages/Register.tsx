import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";
import { api } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = api.register(form.name, form.email, form.phone, form.password);
      setLoading(false);
      if (user) {
        login(user);
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("An account with this email already exists");
      }
    }, 600);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-saffron-subtle py-12">
      <ScrollReveal>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border/50 shadow-md w-full max-w-sm space-y-4">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-1">Create Account</h1>
            <p className="text-sm text-muted-foreground">Join our temple community</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputClass} maxLength={100} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={inputClass} maxLength={255} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className={inputClass} maxLength={15} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
            <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="Repeat password" className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-[0.97]"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </ScrollReveal>
    </div>
  );
};

export default Register;
