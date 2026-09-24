import Link from "next/link";

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Scissors,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const services = [
  "Classic Haircut",
  "Beard Trim",
  "Hot Towel Shave",
  "Hair & Beard Combo",
];

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export function Footer() {
  return (
    <footer className="bg-barber-black text-white">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-barber-gold text-barber-black">
                <Scissors className="h-5 w-5" />
              </div>

              <div>
                <div className="font-display text-xl font-bold">CRAFT</div>

                <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Barber Studio
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">
              Precision cuts, classic grooming and modern barbering in a
              relaxed, professional atmosphere.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-barber-gold hover:text-barber-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-barber-gold hover:text-barber-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg">Explore</h3>

            <div className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 transition hover:text-barber-gold"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/terms"
                className="text-sm text-white/60 transition hover:text-barber-gold"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg">Services</h3>

            <div className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="text-sm text-white/60 transition hover:text-barber-gold"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg">Visit Us</h3>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-barber-gold" />

                <span className="text-sm leading-5 text-white/60">
                  24 King Street
                  <br />
                  Downtown
                </span>
              </div>

              <div className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-barber-gold" />

                <a
                  href="tel:+15550123456"
                  className="text-sm text-white/60 hover:text-white"
                >
                  +1 (555) 012-3456
                </a>
              </div>

              <div className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-barber-gold" />

                <a
                  href="mailto:hello@craftbarber.com"
                  className="text-sm text-white/60 hover:text-white"
                >
                  hello@craftbarber.com
                </a>
              </div>
            </div>

            <Button asChild variant="gold" className="mt-6">
              <Link href="/booking">Book an Appointment</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Craft Barber Studio. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
