import React from "react";
import ServiceHeroSection from "../ui/service-hero-section";
import VibeStatement from "../ui/vibe-statement";

const AlterationView = () => {
  return (
    <div>
      <ServiceHeroSection
        title="Fitting & Alterations"
        description="Don't let a poor fit hide a great garment. We breathe new life into your wardrobe 
              with master-level alterations and structural refinements."
        bespokeType="Fitting & Alterations"
        image="https://images.unsplash.com/photo-1719563014656-802c0aa9632a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjBjbG90aGVzJTIwYWx0ZXJhdGlvbnN8ZW58MXx8fHwxNzY3ODMwNjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      <VibeStatement quote="We believe the difference between a good outfit and a great one is exactly 1/4 of an inch." />
    </div>
  );
};

export default AlterationView;
