import React from "react";

const ProcessSection = () => {
  return (
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
              Discuss your vision, lifestyle, and specific requirements with our
              master tailor.
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
              Over 30 precise measurements ensure perfect fit across shoulders,
              chest, waist, and sleeves.
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
  );
};

export default ProcessSection;
