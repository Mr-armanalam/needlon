import React from "react";

const PricingDetails = () => {
  return (
    <section className="pb-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* SUITS */}
        <div id="suits">
          <h2
            className="text-[#1A1D2E] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Suits
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jacket */}
            <div className="bg-white rounded-sm p-8 border border-gray-200">
              <h3
                className="text-[#D4AF37] text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Jacket
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Center seam in/out
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£35.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Sides in/out</span>
                  <span className="text-[#1A1D2E] text-sm">£55.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Sides blades in/out
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£75.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Taper sleeves in/out
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten shoulders
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£125.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten/ lengthen jacket
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£125.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten/ lengthen sleeves from bottom
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£65.00 and up</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 text-sm">
                    Shorten sleeves from top
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£145.00 and up</span>
                </div>
              </div>
            </div>

            {/* Vest */}
            <div className="bg-white rounded-sm p-8 border border-gray-200">
              <h3
                className="text-[#D4AF37] text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Vest
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Sides in/out</span>
                  <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Raise shoulders</span>
                  <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Reshape neckline/ armhole
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £35.00 - £65.00
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 text-sm">Shorten vest</span>
                  <span className="text-[#1A1D2E] text-sm">
                    £65 - £85.00 and up
                  </span>
                </div>
              </div>
            </div>

            {/* Trousers */}
            <div className="bg-white rounded-sm p-8 border border-gray-200 lg:col-span-2">
              <h3
                className="text-[#D4AF37] text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Trousers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten trousers
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£18.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Waist in/out through the sides
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£55.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten wide trousers
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £25.00 - £45.00
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Waist in and taper full legs
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£85.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten extra-wide trousers
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£50.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Taper full legs</span>
                  <span className="text-[#1A1D2E] text-sm">£55.00 and up</span>
                </div>
                <div className="flex justify-between items-start md:col-span-2">
                  <span className="text-gray-600 text-sm">
                    Taper legs knee up/ down
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£25.00 and up</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CASUAL GARMENTS */}
        <div id="casual">
          <h2
            className="text-[#1A1D2E] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Casual Garments
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jeans Pants / Casual Pants */}
            <div className="bg-white rounded-sm p-8 border border-gray-200">
              <h3
                className="text-[#D4AF37] text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Jeans Pants / Casual Pants
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Shorten jeans</span>
                  <span className="text-[#1A1D2E] text-sm">£20.00</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten wide jeans
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £25.00 - £45.00
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten jeans with original hem
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£35.00</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten wide jeans with original hem
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £45.00 - £65.00
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Waist in/out</span>
                  <span className="text-[#1A1D2E] text-sm">
                    £45.00 - £65.00
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Waist in and taper full legs
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£65.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Taper full legs</span>
                  <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 text-sm">
                    Taper legs knee up/ down
                  </span>
                  <span className="text-[#1A1D2E] text-sm">£25.00 and up</span>
                </div>
              </div>
            </div>

            {/* Blouse / Shirt */}
            <div className="bg-white rounded-sm p-8 border border-gray-200">
              <h3
                className="text-[#D4AF37] text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Blouse / Shirt
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Sides in/ out</span>
                  <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Taper sleeves</span>
                  <span className="text-[#1A1D2E] text-sm">£40.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Raise shoulders</span>
                  <span className="text-[#1A1D2E] text-sm">£40.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten sleeves from bottom
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £25.00 - £50.00
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">
                    Shorten sleeves from top
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £85.00 - £125.00
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 text-sm">
                    Shorten blouse/ shirt
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £35.00 - £85.00
                  </span>
                </div>
              </div>
            </div>

            {/* Skirt */}
            <div className="bg-white rounded-sm p-8 border border-gray-200">
              <h3
                className="text-[#D4AF37] text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Skirt
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Waist in/ out</span>
                  <span className="text-[#1A1D2E] text-sm">
                    £45.00 - £75.00
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Sides in/out</span>
                  <span className="text-[#1A1D2E] text-sm">£50.00 and up</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600 text-sm">Shorten skirt</span>
                  <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 text-sm">
                    Shorten wide skirt 1-3 layers
                  </span>
                  <span className="text-[#1A1D2E] text-sm">
                    £65.00 - £125.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DRESSES */}
        <div id="dresses">
          <h2
            className="text-[#1A1D2E] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dresses
          </h2>

          <div className="bg-white rounded-sm p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Sides in/ out</span>
                <span className="text-[#1A1D2E] text-sm">£65.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Reshape neckline/ armhole
                </span>
                <span className="text-[#1A1D2E] text-sm">£45.00 - £65.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Front/ back darts in/ out
                </span>
                <span className="text-[#1A1D2E] text-sm">£35.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Taper sleeves</span>
                <span className="text-[#1A1D2E] text-sm">£25.00 - £45.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Princess darts in/ out (recut front)
                </span>
                <span className="text-[#1A1D2E] text-sm">£65.00 - £165.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Shorten sleeves</span>
                <span className="text-[#1A1D2E] text-sm">£35.00 - £65.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Shorten waistband</span>
                <span className="text-[#1A1D2E] text-sm">£85.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Shorten sleeves from top
                </span>
                <span className="text-[#1A1D2E] text-sm">£75.00 - £125.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Raise shoulders</span>
                <span className="text-[#1A1D2E] text-sm">£35.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Shorten/ lengthen plain hem
                </span>
                <span className="text-[#1A1D2E] text-sm">£50.00 - £85.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Shorten straps</span>
                <span className="text-[#1A1D2E] text-sm">£25.00 - £45.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Shorten wide layers hem
                </span>
                <span className="text-[#1A1D2E] text-sm">
                  £75.00 - £145.00 and up
                </span>
              </div>
              <div className="flex justify-between items-start md:col-span-2">
                <span className="text-gray-600 text-sm">
                  Shorten extra wide layers
                </span>
                <span className="text-[#1A1D2E] text-sm">
                  £95.00 - £145 and up
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OUTERWEAR */}
        <div id="outerwear">
          <h2
            className="text-[#1A1D2E] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Outerwear
          </h2>

          <div className="bg-white rounded-sm p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Center seam in/out
                </span>
                <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Shorten / raise shoulders
                </span>
                <span className="text-[#1A1D2E] text-sm">£165.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Sides in/out</span>
                <span className="text-[#1A1D2E] text-sm">£75.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Add/ remove shoulders pads
                </span>
                <span className="text-[#1A1D2E] text-sm">£35.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Sides blades in/out
                </span>
                <span className="text-[#1A1D2E] text-sm">£85.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Shorten/ lengthen</span>
                <span className="text-[#1A1D2E] text-sm">£125.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Taper sleeves in/out
                </span>
                <span className="text-[#1A1D2E] text-sm">£55.00 - £75.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Shorten sleeves from top
                </span>
                <span className="text-[#1A1D2E] text-sm">£165.00 and up</span>
              </div>
              <div className="flex justify-between items-start md:col-span-2">
                <span className="text-gray-600 text-sm">
                  Shorten / lengthen sleeves from bottom
                </span>
                <span className="text-[#1A1D2E] text-sm">£75.00 and up</span>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER */}
        <div id="other">
          <h2
            className="text-[#1A1D2E] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Other Services
          </h2>

          <div className="bg-white rounded-sm p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Repair zipper</span>
                <span className="text-[#1A1D2E] text-sm">£15.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Add/ remove shoulders pads
                </span>
                <span className="text-[#1A1D2E] text-sm">£35.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Replace zipper</span>
                <span className="text-[#1A1D2E] text-sm">£45.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Repair stitch</span>
                <span className="text-[#1A1D2E] text-sm">£15.00 - £45.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">New button</span>
                <span className="text-[#1A1D2E] text-sm">£5.00 - £10.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">
                  Repair stitch by hand
                </span>
                <span className="text-[#1A1D2E] text-sm">£20.00 - £55.00</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Move button</span>
                <span className="text-[#1A1D2E] text-sm">£5.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Add hook and eye</span>
                <span className="text-[#1A1D2E] text-sm">£10.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Add snap</span>
                <span className="text-[#1A1D2E] text-sm">£10.00 and up</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <span className="text-gray-600 text-sm">Add cups</span>
                <span className="text-[#1A1D2E] text-sm">£25.00 and up</span>
              </div>
              <div className="flex justify-between items-start md:col-span-2">
                <span className="text-gray-600 text-sm">Patching</span>
                <span className="text-[#1A1D2E] text-sm">£25.00- £65.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingDetails;
