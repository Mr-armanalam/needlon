import FooterSection from "@/modules/shared/footer/footer-section";
import NavbarSection from "@/modules/shared/navbar/navbar-section";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Needlon",
  description: "A fashionable clothing tailoring service",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarSection />
      <div className="flex flex-col min-h-screen flex-1">
        {children}
      </div>
      <FooterSection />
    </>
  );
};

export default layout;
