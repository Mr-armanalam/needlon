import React from "react";
import HeroSection from "../section/hero-section";
import HomePremRecomLike from "../ui/home-prem-recom-like";

const item = [
  {heading: 'Premium Items'},
  {heading: 'You may like'},
  {heading: 'Recommended Items'}
]

const HomeView = () => {
  return (
    <div>
      <HeroSection />
      <div className="bg-gray-100 flex flex-col gap-y-2 p-2">
        {item.map(({heading}, i) => (
          <HomePremRecomLike key={i} heading={heading} />
        ))}
      </div>

    </div>
  );
};

export default HomeView;
