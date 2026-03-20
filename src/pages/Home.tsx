import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-temple.jpg";
import radhaKrishnaImg from "@/assets/radha-krishna.jpg";

const Home = () => (
  <div>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Sri Sri Radha Krishnachandra Mandir"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/55" />
      <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-up">
        <p className="text-gold text-sm md:text-base uppercase tracking-[0.2em] font-medium mb-4">
          ॐ Hare Krishna ॐ
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
          Sri Sri Radha Krishnachandra Mandir
        </h1>
        <p className="text-primary-foreground/85 text-base md:text-lg max-w-xl mx-auto mb-8 font-light">
          A sacred temple dedicated to the divine love of Radha and Krishna, nestled in the heart of Hadapsar, Pune.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/about"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
          >
            Visit Temple
          </Link>
          <Link
            to="/donate"
            className="px-6 py-3 rounded-lg border border-gold text-gold font-medium text-sm hover:bg-gold/10 transition-colors active:scale-[0.97]"
          >
            Make a Donation
          </Link>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-20 md:py-28 bg-saffron-subtle">
      <div className="container-temple">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <div className="divider-ornament mb-6" />
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-6">
            Welcome to Our Sacred Abode
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Sri Sri Radha Krishnachandra Mandir is a vibrant spiritual centre where devotees gather to 
            worship, learn, and serve. Inspired by the timeless teachings of Bhagavad Gita and 
            Srimad Bhagavatam, our temple nurtures the practice of Bhakti Yoga — the path of 
            devotional service to the Supreme Lord Sri Krishna.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} className="mt-12 flex justify-center">
          <img
            src={radhaKrishnaImg}
            alt="Sri Sri Radha Krishna Deities"
            className="rounded-xl shadow-xl max-w-sm md:max-w-md w-full object-cover"
          />
        </ScrollReveal>
      </div>
    </section>

    {/* Quick Info */}
    <section className="py-16 md:py-24">
      <div className="container-temple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Daily Aarti", desc: "Morning & evening aarti at 5:00 AM and 7:00 PM", icon: "🪔" },
            { title: "Sunday Feast", desc: "Sumptuous prasadam served every Sunday at 1:00 PM", icon: "🍛" },
            { title: "Bhajan & Kirtan", desc: "Soul-stirring congregational chanting daily", icon: "🎶" },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50 text-center">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;
