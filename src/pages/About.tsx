import ScrollReveal from "@/components/ScrollReveal";
import radhaKrishnaImg from "@/assets/radha-krishna.jpg";

const About = () => (
  <div className="pt-20">
    {/* Header */}
    <section className="py-16 md:py-24 bg-saffron-subtle">
      <div className="container-temple text-center">
        <ScrollReveal>
          <div className="divider-ornament mb-6" />
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">About Our Temple</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the rich history, mission, and spiritual vision behind Sri Sri Radha Krishnachandra Mandir.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* History */}
    <section className="py-16 md:py-24">
      <div className="container-temple grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <img src={radhaKrishnaImg} alt="Temple Deities" className="rounded-xl shadow-lg w-full object-cover max-h-96" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-2xl font-display font-semibold mb-4">Temple History</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Established in the year 2005, Sri Sri Radha Krishnachandra Mandir was founded by a group 
            of dedicated devotees with the blessings of senior Vaishnavas. Located in Laxmi Colony, 
            Hadapsar, the temple has grown into a thriving spiritual hub for thousands of families.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The beautifully installed Deities of Sri Sri Radha Krishnachandra receive daily worship with 
            loving devotion, following the standards prescribed in the Vaishnava tradition.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-16 md:py-20 bg-card">
      <div className="container-temple grid md:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm h-full">
            <h3 className="font-display text-xl font-semibold mb-4 text-primary">Our Mission</h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li>• To propagate the sublime teachings of Bhagavad Gita and Srimad Bhagavatam</li>
              <li>• To conduct regular programs of Bhakti Yoga for spiritual upliftment</li>
              <li>• To distribute sanctified vegetarian prasadam to all visitors</li>
              <li>• To build a community of sincere devotees practicing Krishna consciousness</li>
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm h-full">
            <h3 className="font-display text-xl font-semibold mb-4 text-primary">Our Vision</h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li>• A world where every soul reconnects with the Supreme through devotion</li>
              <li>• A temple that serves as a beacon of spiritual knowledge and compassion</li>
              <li>• To expand outreach through festivals, education, and charitable activities</li>
              <li>• To inspire the next generation with timeless Vedic wisdom</li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Activities */}
    <section className="py-16 md:py-24">
      <div className="container-temple text-center">
        <ScrollReveal>
          <div className="divider-ornament mb-6" />
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-10">Spiritual Activities</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Mangal Aarti", time: "5:00 AM", desc: "Begin your day with the auspicious morning worship" },
            { title: "Bhagavatam Class", time: "7:30 AM", desc: "Deep study of Srimad Bhagavatam" },
            { title: "Sandhya Aarti", time: "7:00 PM", desc: "Evening aarti with devotional kirtan" },
            { title: "Sunday Program", time: "11:00 AM", desc: "Special kirtan, lecture, and prasadam feast" },
          ].map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 80}>
              <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{a.time}</p>
                <h4 className="font-display text-base font-semibold mb-2">{a.title}</h4>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
