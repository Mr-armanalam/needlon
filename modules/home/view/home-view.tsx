import React from "react";
import HeroSection from "../section/hero-section";
import HomePremRecomLike from "../ui/home-prem-recom-like";
import DescriptionSection from "../section/description-section";
import SeasonSection from "../section/season-section";

const item = [
  {heading: 'Premium Items'},
  {heading: 'You may like'},
]

const HomeView = () => {
  return (
    <div>
      <HeroSection />
      <div className="bg-gray-100 flex flex-col gap-y-2 p-2">
        {item.map(({heading}, i) => (
          <HomePremRecomLike key={i} heading={heading} />
        ))}
        <SeasonSection />
        <HomePremRecomLike heading="Recommended Items" />
      </div>
        <DescriptionSection />
    </div>
  );
};

export default HomeView;
