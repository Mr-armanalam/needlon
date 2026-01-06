import React from "react";

const VibeStatement = () => {
  return (
    <section className="bg-gray-100 py-2 mt-12">
      <div className="bg-white py-8 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8" />
          <blockquote
            className="text-stone-800 text-2xl md:text-4xl leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            "True style isn't about standing out; it's about being remembered for
            the right reasons."
          </blockquote>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
};

export default VibeStatement;
