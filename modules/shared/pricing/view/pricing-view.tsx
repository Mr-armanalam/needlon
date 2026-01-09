import React from "react";
import HeadingPrice from "../ui/heading-price";
import PricingDetails from "../ui/pricing-details";
import CallToAction from "../ui/call-to-action";

const PricingView = () => {
  return (
    <div className="bg-[#F5F3EF]">
      <HeadingPrice />
      <PricingDetails />
      <CallToAction />
    </div>
  );
};

export default PricingView;
