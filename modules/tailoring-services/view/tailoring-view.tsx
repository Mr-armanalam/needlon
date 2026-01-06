import React from "react";
import { ArrowRight } from "lucide-react";
import ServiceHeroSection from "../ui/service-hero-section";
import VibeStatement from "../ui/vibe-statement";
import ServicePillarSection from "../ui/service-piller-section";
import ProcessSection from "../ui/process-section";
import ServiceImageGallery from "../ui/service-image-gallery";

export default function TailoringView() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceHeroSection />
      <VibeStatement />
      <ServicePillarSection />
      <ProcessSection />
      <ServiceImageGallery />

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
    </div>
  );
}
