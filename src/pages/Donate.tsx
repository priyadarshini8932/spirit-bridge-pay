import { useState } from "react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";
import { api } from "@/lib/mockData";

const paymentMethods = ["UPI", "Card", "Net Banking"];

const Donate = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", amount: "", paymentMethod: "UPI" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    if (Number(form.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      const donation = api.addDonation({
        name: form.name,
        email: form.email,
        phone: form.phone,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
      });
      setLoading(false);
      toast.success(`Donation of ₹${form.amount} received! Transaction ID: ${donation.transactionId}`);
      setForm({ name: "", email: "", phone: "", amount: "", paymentMethod: "UPI" });
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24 bg-saffron-subtle">
        <div className="container-temple text-center">
          <ScrollReveal>
            <div className="divider-ornament mb-6" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Donate</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your generous contributions help sustain our temple activities, prasadam distribution, and community programs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-temple max-w-lg mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 md:p-8 border border-border/50 shadow-sm space-y-5">
              <h2 className="font-display text-xl font-semibold text-center mb-2">Make a Donation</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className={inputClass}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className={inputClass}
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                  maxLength={15}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Amount (₹)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="1100"
                  className={inputClass}
                  min={1}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Payment Method</label>
                <div className="flex gap-2">
                  {paymentMethods.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: m })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border active:scale-[0.97] ${
                        form.paymentMethod === m
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-[0.97]"
              >
                {loading ? "Processing..." : "Donate Now"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                This is a simulated payment. Connect Razorpay for live transactions.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Donate;
