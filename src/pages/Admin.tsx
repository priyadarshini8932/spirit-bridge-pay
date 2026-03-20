import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, IndianRupee, Mail, Gift } from "lucide-react";
import { api } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";
import ScrollReveal from "@/components/ScrollReveal";

const Admin = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"donations" | "messages">("donations");

  if (!user || !isAdmin) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-saffron-subtle">
        <ScrollReveal>
          <div className="bg-card rounded-xl p-8 border border-border/50 shadow-md max-w-sm text-center space-y-4">
            <h1 className="font-display text-2xl font-bold">Admin Access Only</h1>
            <p className="text-sm text-muted-foreground">Please login with an admin account to access this panel.</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Go to Login
            </button>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  const donations = api.getDonations();
  const totalDonations = api.getTotalDonations();
  const messages = api.getMessages();

  const handleLogout = () => {
    logout();
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <div className="pt-20 min-h-screen bg-card/50">
      <div className="container-temple py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-background border border-border hover:bg-muted transition-colors active:scale-[0.97]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: IndianRupee, label: "Total Donations", value: `₹${totalDonations.toLocaleString("en-IN")}` },
            { icon: Gift, label: "Total Donors", value: donations.length },
            { icon: Mail, label: "Messages", value: messages.length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-background rounded-xl p-5 border border-border/50 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-saffron-light flex items-center justify-center">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold tabular-nums">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          {(["donations", "messages"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                tab === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-x-auto">
          {tab === "donations" ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Method</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Transaction ID</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">{d.name}</td>
                    <td className="px-4 py-3 font-medium tabular-nums">₹{d.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{d.paymentMethod}</td>
                    <td className="px-4 py-3 hidden md:table-cell font-mono text-xs">{d.transactionId}</td>
                    <td className="px-4 py-3 tabular-nums">{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Message</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">{m.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{m.email}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{m.message}</td>
                    <td className="px-4 py-3 tabular-nums">{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
