import ScrollReveal from "@/components/ScrollReveal";
import aartiImg from "@/assets/aarti.jpg";
import kirtanImg from "@/assets/kirtan.jpg";
import prasadamImg from "@/assets/prasadam.jpg";
import festivalImg from "@/assets/festival.jpg";

const services = [
  {
    title: "Daily Aarti",
    desc: "Experience the divine atmosphere with our daily Mangal Aarti at 5:00 AM and Sandhya Aarti at 7:00 PM. The aarti ceremony invokes the presence of the Lord with lamps, incense, and devotional hymns.",
    img: aartiImg,
  },
  {
    title: "Bhajan & Kirtan",
    desc: "Join congregational chanting of the Holy Names — the Hare Krishna Maha-Mantra. Our kirtan sessions feature traditional instruments like mridanga and kartals, creating a blissful devotional atmosphere.",
    img: kirtanImg,
  },
  {
    title: "Prasadam Distribution",
    desc: "Sanctified vegetarian food prepared with love and offered to the Lord. Every Sunday, we serve a sumptuous feast to all visitors. During festivals, special prasadam is distributed to thousands.",
    img: prasadamImg,
  },
  {
    title: "Festivals & Events",
    desc: "We celebrate major Vaishnava festivals including Janmashtami, Radhashtami, Gaura Purnima, and Rath Yatra with grand decorations, special worship, and community participation.",
    img: festivalImg,
  },
];

const Services = () => (
  <div className="pt-20">
    <section className="py-16 md:py-24 bg-saffron-subtle">
      <div className="container-temple text-center">
        <ScrollReveal>
          <div className="divider-ornament mb-6" />
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We offer a range of spiritual services and programs for devotees and visitors.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container-temple space-y-16">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 60}>
            <div className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img src={s.img} alt={s.title} className="rounded-xl shadow-lg w-full h-64 object-cover" />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="text-xl md:text-2xl font-display font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </div>
);

export default Services;
