import React from 'react'
import { ServicePillar } from '../components/service-piller'

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

const ServicePillarSection = () => {
  return (
    <section className="py-24 px-6 lg:px-8">
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
  )
}

export default ServicePillarSection