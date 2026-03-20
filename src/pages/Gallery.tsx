import { useState } from "react";
import { X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-temple.jpg";
import radhaKrishnaImg from "@/assets/radha-krishna.jpg";
import aartiImg from "@/assets/aarti.jpg";
import kirtanImg from "@/assets/kirtan.jpg";
import prasadamImg from "@/assets/prasadam.jpg";
import festivalImg from "@/assets/festival.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

const images = [
  { src: radhaKrishnaImg, alt: "Sri Sri Radha Krishna Deities" },
  { src: heroImg, alt: "Temple Exterior" },
  { src: aartiImg, alt: "Aarti Ceremony" },
  { src: kirtanImg, alt: "Kirtan Session" },
  { src: prasadamImg, alt: "Prasadam Distribution" },
  { src: festivalImg, alt: "Festival Celebrations" },
  { src: gallery1, alt: "Temple Gardens" },
  { src: gallery2, alt: "Temple Interior" },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24 bg-saffron-subtle">
        <div className="container-temple text-center">
          <ScrollReveal>
            <div className="divider-ornament mb-6" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Gallery</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Glimpses of our temple, festivals, and devotional activities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-temple">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <button
                  onClick={() => setLightbox(i)}
                  className="block w-full overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-40 md:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/85 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/40 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
