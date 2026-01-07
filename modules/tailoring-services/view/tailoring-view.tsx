import ServiceHeroSection from "../ui/service-hero-section";
import VibeStatement from "../ui/vibe-statement";
import ServicePillarSection from "../ui/service-piller-section";
import ProcessSection from "../ui/process-section";
import ServiceImageGallery from "../ui/service-image-gallery";
import { servicePillarsMens } from "@/data/service-data";

export default function TailoringView() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceHeroSection
        bespokeType="Men's"
        title="The Modern Standard of Masculine Elegance"
        description=" Beyond the rack. We craft garments that respect tradition while embracing your individual style and physique."
        image="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHN1aXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc1NzQ3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      <VibeStatement quote="True style isn't about standing out; it's about being remembered for the right reasons." />
      <ServicePillarSection
        servicePillars={servicePillarsMens}
        heading=" Our Craft"
        title="Key Service Pillars"
        description="Three foundational offerings that define masculine elegance. Each crafted with precision, built to endure."
      />
      <ProcessSection />
      <ServiceImageGallery />
    </div>
  );
}
