import React from "react";
import HomePremRecomLike from "../ui/home-prem-recom-like";
import DescriptionSection from "../section/description-section";
import SeasonSection from "../section/season-section";

const HomeView = () => {
  return (
    <div>
      <HomePremRecomLike heading={"You may like"} />
      <SeasonSection />
      <HomePremRecomLike heading="Recommended Items" />
      <DescriptionSection />
    </div>
  );
};

export default HomeView;
