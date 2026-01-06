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
    </div>
  );
}
