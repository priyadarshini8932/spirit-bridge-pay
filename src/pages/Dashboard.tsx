import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, IndianRupee, Mail, Settings } from "lucide-react";
import { api } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";
import ScrollReveal from "@/components/ScrollReveal";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"donations" | "messages" | "profile">("donations");

  if (!user) {
    navigate("/login");
    return null;
  }

  const myDonations = api.getDonationsByUser(user.id);
  const myMessages = api.getMessagesByUser(user.id);
  const totalDonated = myDonations.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="pt-20 min-h-screen bg-card/50">
      <div className="container-temple py-8">
        {/* Welcome */}
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-sm text-muted-foreground">Manage your donations, messages, and profile</p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={80}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: IndianRupee, label: "Total Donated", value: `₹${totalDonated.toLocaleString("en-IN")}` },
              { icon: Mail, label: "Messages Sent", value: myMessages.length },
              { icon: User, label: "Member Since", value: "March 2026" },
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
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          {([
            { key: "donations", label: "My Donations" },
            { key: "messages", label: "My Messages" },
            { key: "profile", label: "Profile" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-x-auto">
          {tab === "donations" && (
            myDonations.length === 0 ? (
              <div className="p-10 text-center">
                <IndianRupee size={32} className="mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm mb-3">You haven't made any donations yet</p>
                <button onClick={() => navigate("/donate")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
                  Make Your First Donation
                </button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Method</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Transaction ID</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {myDonations.map((d) => (
                    <tr key={d.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium tabular-nums">₹{d.amount.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">{d.paymentMethod}</td>
                      <td className="px-4 py-3 hidden md:table-cell font-mono text-xs">{d.transactionId}</td>
                      <td className="px-4 py-3 tabular-nums">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {tab === "messages" && (
            myMessages.length === 0 ? (
              <div className="p-10 text-center">
                <Mail size={32} className="mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm mb-3">No messages sent yet</p>
                <button onClick={() => navigate("/contact")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
                  Contact Us
                </button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">Message</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {myMessages.map((m) => (
                    <tr key={m.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">{m.message}</td>
                      <td className="px-4 py-3 tabular-nums">{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {tab === "profile" && (
            <div className="p-6 md:p-8 max-w-md space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-saffron-light flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-primary">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{user.role} Account</p>
                </div>
              </div>
              {[
                { label: "Full Name", value: user.name },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm font-medium bg-muted rounded-lg px-4 py-2.5">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
