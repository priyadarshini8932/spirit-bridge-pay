import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container-temple py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-display font-semibold mb-4 text-gold">Sri Sri Radha Krishnachandra Mandir</h3>
          <p className="text-sm leading-relaxed opacity-80">
            A sacred abode dedicated to the divine love of Sri Sri Radha Krishna. 
            Serving the devotees with spiritual knowledge, prasadam, and devotional activities.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {["About", "Services", "Gallery", "Donate", "Contact"].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase()}`} className="hover:text-gold transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              Laxmi Colony, Hadapsar, Pune, Maharashtra – 411028
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold" />
              info@radhakrishnatemple.org
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs opacity-50">
        © {new Date().getFullYear()} Sri Sri Radha Krishnachandra Mandir. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
