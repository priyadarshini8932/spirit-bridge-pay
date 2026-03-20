import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { api } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";

const Contact = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      api.addMessage(form, user?.id);
      setLoading(false);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24 bg-saffron-subtle">
        <div className="container-temple text-center">
          <ScrollReveal>
            <div className="divider-ornament mb-6" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We'd love to hear from you. Reach out for any inquiries or to plan your visit.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-temple grid md:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">Temple Information</h2>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Laxmi Colony, Hadapsar, Pune, Maharashtra – 411028, India" },
                  { icon: Phone, label: "+91 98765 43210" },
                  { icon: Mail, label: "info@radhakrishnatemple.org" },
                  { icon: Clock, label: "Open daily: 4:30 AM – 9:00 PM" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl overflow-hidden border border-border/50 shadow-sm">
                <iframe
                  title="Temple Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5!2d73.93!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzAwLjAiTiA3M8KwNTUnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={100}>
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 md:p-8 border border-border/50 shadow-sm space-y-5">
              <h2 className="font-display text-xl font-semibold">Send a Message</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
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
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  rows={4}
                  className={inputClass + " resize-none"}
                  maxLength={1000}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-[0.97]"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
