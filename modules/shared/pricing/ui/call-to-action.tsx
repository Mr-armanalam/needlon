import { ArrowRight } from "lucide-react";
import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-[#1A1D2E] py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-white mb-6 text-3xl md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ready to Transform Your Wardrobe?
        </h2>
        <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto">
          Book your fitting appointment today. Our expert tailors will ensure
          every garment fits perfectly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group bg-[#D4AF37] text-[#1A1D2E] px-10 py-4 rounded-sm hover:bg-[#C5A028] transition-all inline-flex items-center gap-3">
            <span>Book a Fitting</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-white text-white px-10 py-4 rounded-sm hover:bg-white hover:text-[#1A1D2E] transition-all">
            Download Price List
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-8">
          Standard turnaround: 5-7 working days | Express service available upon
          request
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
