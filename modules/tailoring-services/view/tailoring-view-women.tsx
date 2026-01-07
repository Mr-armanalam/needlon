import { ArrowRight, Scissors } from "lucide-react";
import ServiceHeroSection from "../ui/service-hero-section";
import VibeStatement from "../ui/vibe-statement";
import ServicePillarSection from "../ui/service-piller-section";
import { servicePillarsWomens } from "@/data/service-data";

export default function TailoringViewWomen() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceHeroSection
        bespokeType="Women's"
        title=" Precision Tailoring for the Modern Woman"
        image="https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwc3VpdHxlbnwxfHx8fDE3Njc2MzU0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        description=" From the boardroom to the gala, experience the confidence that comes from a garment designed specifically for your proportions."
      />

      <VibeStatement quote="We don't just fit clothes to your body; we craft them to match your ambition." />

      <ServicePillarSection
        heading="Our Collection"
        title="Key Service Pillars"
        servicePillars={servicePillarsWomens}
        description="Three distinctive collections designed to empower every aspect of your life. Versatile, sophisticated, and unmistakably yours."
      />

      {/* The Process */}
      <section id="process" className="bg-white py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-[#1A1D2E] mb-4 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Design Approach
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A collaborative journey that celebrates your unique style and
              needs.
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
                Style Consultation
              </h4>
              <p className="text-gray-600 text-sm">
                Explore your personal style, lifestyle needs, and wardrobe goals
                in an intimate setting.
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
                Body Mapping
              </h4>
              <p className="text-gray-600 text-sm">
                Comprehensive measurements and posture analysis ensure garments
                that flatter your unique form.
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
                Material & Design
              </h4>
              <p className="text-gray-600 text-sm">
                Select from curated fabrics and refine every design detail from
                buttons to linings.
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
                Creation & Refinement
              </h4>
              <p className="text-gray-600 text-sm">
                Progressive fittings perfect every seam, ensuring impeccable
                drape and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-8 bg-[#F5F3EF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-[#1A1D2E] mb-4 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Designed for Your Life
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="mb-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
              </div>
              <h3
                className="text-[#1A1D2E] mb-3 text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Versatility
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is designed to integrate seamlessly into your
                existing wardrobe, offering endless styling possibilities for
                any occasion.
              </p>
            </div>

            <div>
              <div className="mb-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
              </div>
              <h3
                className="text-[#1A1D2E] mb-3 text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Empowerment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clothing should enhance your confidence, not constrain it. We
                create garments that move with you and support your ambitions.
              </p>
            </div>

            <div>
              <div className="mb-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
              </div>
              <h3
                className="text-[#1A1D2E] mb-3 text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Craftsmanship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From hidden pocket placements to reinforced seams, every detail
                is considered for both beauty and function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1647202152259-98fe50ad0618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhc2hpb24lMjBkZXNpZ25lciUyMGZpdHRpbmd8ZW58MXx8fHwxNzY3NjU1OTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fashion designer fitting"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="aspect-[3/2] overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1723277171985-07c20f1876e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsYXplciUyMHRhaWxvcmVkJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njc2NTU5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tailored blazer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/2] overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwYmxvdXNlJTIwZWxlZ2FudCUyMGZhYnJpY3xlbnwxfHx8fDE3Njc2NTU5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Silk fabric details"
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
            Your Wardrobe, Reimagined
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Begin your bespoke journey with a personalized design consultation.
            Let's create garments that celebrate who you are and where you're
            going.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group bg-[#D4AF37] text-[#1A1D2E] px-10 py-4 rounded-sm hover:bg-[#C5A028] transition-all inline-flex items-center gap-3">
              <span>Book a Design Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-sm hover:bg-white hover:text-[#1A1D2E] transition-all">
              Explore Our Portfolio
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
