import Image from "next/image";
import React from "react";

const ServiceImageGallery = () => {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#F5F3EF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Large Image */}
          <div className="relative aspect-3/4 overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1633655442168-c6ef0ed2f984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjBzdWl0fGVufDF8fHx8MTc2NzU3ODQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Tailor measuring"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-1 gap-6">
            
            <div className="relative aspect-3/2 overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1588723722558-2210247e3a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zJTIwc3VpdCUyMGRldGFpbHN8ZW58MXx8fHwxNzY3NTc4NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Suit details"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="relative aspect-3/2 overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1603251605785-2a67176883ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNoaXJ0JTIwZmFicmljJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njc1Nzg0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fabric textures"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceImageGallery;
