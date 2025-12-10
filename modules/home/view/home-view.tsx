import React from "react";
import DescriptionSection from "../section/description-section";
import SeasonSection from "../section/season-section";

const HomeView = () => {
  return (
    <div>
      <SeasonSection />
      <DescriptionSection />
    </div>
  );
};

export default HomeView;
