import React from "react";
import { ArrowRight, Scissors, ArrowLeft } from "lucide-react";
import { ServicePillar } from "../components/service-piller";
import Image from "next/image";
import ServiceHeroSection from "../ui/service-hero-section";
import VibeStatement from "../ui/vibe-statement";

export default function TailoringView() {
  const servicePillars = [
    {
      title: "The Power Suit",
      description:
        "Full canvassed construction designed to provide structure, comfort, and a silhouette that commands respect. Our master tailors employ time-honored techniques passed down through generations, ensuring your suit moves with you while maintaining impeccable form. From the first stitch to the final press, every element is crafted to elevate your presence.",
      imageUrl:
        "https://images.unsplash.com/photo-1588723722558-2210247e3a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zJTIwc3VpdCUyMGRldGFpbHN8ZW58MXx8fHwxNzY3NTc4NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Custom Shirting",
      description:
        "Choose from over 500 premium cottons. From collar stays to cuff styles, every detail is yours to decide. Our collection spans the finest Egyptian long-staple cotton to luxurious Sea Island weaves. Whether you prefer a classic point collar or a contemporary spread, each shirt is cut and sewn to your exact specifications, ensuring both comfort and distinction.",
      imageUrl:
        "https://images.unsplash.com/photo-1603251605785-2a67176883ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNoaXJ0JTIwZmFicmljJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njc1Nzg0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Outerwear & Overcoats",
      description:
        "Hand-stitched coats crafted from heavy wools and cashmeres, designed to last a lifetime. Each coat is constructed using traditional methods, with hand-sewn buttonholes and carefully shaped shoulders that drape naturally. From double-breasted chesterfields to modern topcoats, our outerwear combines timeless elegance with enduring quality.",
      imageUrl:
        "https://images.unsplash.com/photo-1649937408746-4d2f603f91c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwb3ZlcmNvYXQlMjBtZW5zd2VhcnxlbnwxfHx8fDE3Njc1Nzg0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ServiceHeroSection />

      <VibeStatement />

      {/* Service Pillars */}
      <section id="pillars" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] tracking-widest uppercase text-sm">
                Our Craft
              </span>
              <div className="w-12 h-px bg-[#D4AF37]" />
            </div>
            <h2
              className="text-[#1A1D2E] mb-4 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Key Service Pillars
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Three foundational offerings that define masculine elegance. Each
              crafted with precision, built to endure.
            </p>
          </div>

          <div className="space-y-32">
            {servicePillars.map((pillar, index) => (
              <ServicePillar
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
                imageUrl={pillar.imageUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section id="process" className="bg-white py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-[#1A1D2E] mb-4 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Bespoke Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From first consultation to final delivery, a journey of precision
              and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <span
                  className="text-[#D4AF37] text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  01
                </span>
              </div>
              <h4
                className="text-[#1A1D2E] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Consultation
              </h4>
              <p className="text-gray-600 text-sm">
                Discuss your vision, lifestyle, and specific requirements with
                our master tailor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <span
                  className="text-[#D4AF37] text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  02
                </span>
              </div>
              <h4
                className="text-[#1A1D2E] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Measurement
              </h4>
              <p className="text-gray-600 text-sm">
                Over 30 precise measurements ensure perfect fit across
                shoulders, chest, waist, and sleeves.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <span
                  className="text-[#D4AF37] text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  03
                </span>
              </div>
              <h4
                className="text-[#1A1D2E] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Fabric Selection
              </h4>
              <p className="text-gray-600 text-sm">
                Choose from hundreds of premium fabrics sourced from the world's
                finest mills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <span
                  className="text-[#D4AF37] text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  04
                </span>
              </div>
              <h4
                className="text-[#1A1D2E] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Crafting & Fittings
              </h4>
              <p className="text-gray-600 text-sm">
                Multiple fittings refine every detail before your garment is
                completed to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 px-6 lg:px-8 bg-[#F5F3EF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1633655442168-c6ef0ed2f984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjBzdWl0fGVufDF8fHx8MTc2NzU3ODQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tailor measuring"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="aspect-[3/2] overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1588723722558-2210247e3a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zJTIwc3VpdCUyMGRldGFpbHN8ZW58MXx8fHwxNzY3NTc4NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Suit details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/2] overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1603251605785-2a67176883ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNoaXJ0JTIwZmFicmljJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njc1Nzg0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fabric textures"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1A1D2E] py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-white mb-6 text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Elevate Your Wardrobe?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a complimentary consultation with one of our master tailors
            and experience the art of true bespoke craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group bg-[#D4AF37] text-[#1A1D2E] px-10 py-4 rounded-sm hover:bg-[#C5A028] transition-all inline-flex items-center gap-3">
              <span>Start Your Bespoke Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-sm hover:bg-white hover:text-[#1A1D2E] transition-all">
              View Pricing Guide
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0F1A] text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Scissors className="w-6 h-6 text-[#D4AF37]" />
                <span
                  className="text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Atelier Elegance
                </span>
              </div>
              <p className="text-gray-400 max-w-md">
                London's premier destination for bespoke tailoring and
                alterations. Crafting excellence since 1987.
              </p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Men's Bespoke
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Women's Tailoring
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Wedding Wear
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Alterations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#D4AF37] mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Savile Row, London</li>
                <li>+44 20 7123 4567</li>
                <li>hello@atelierelegance.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Atelier Elegance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
