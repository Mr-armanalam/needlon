import React from "react";
import Navigationmenu from "./navigation-menu";

const items = [
  { name: "New In", link: "/new-in" , subNevigator: [
    { name: "New Arrivals", description: "Latest additions to our collection", link: "/new-in/arrivals" },
    { name: "Trending", description: "Popular items right now", link: "/new-in/trending" },
    { name: "Best Sellers", description: "Most purchased items", link: "/new-in/best-sellers" },
  ]},
  { name: "Ready to Wear", link: "/ready-to-wear", },
  { name: "Services", link: "/services" },
  { name: "Our World", link: "/our-world" },
  { name: "Collection", link: "/collection" },
  { name: "About", link: "/about" },
];

const NavigationItems = () => {
  return (
    <div className="flex items-center justify-center space-x-8">
      <h1 className="font-bold font-garamond text-2xl">Needlon</h1>
      <div className="flex items-center justify-center mt-auto mb-[3px] space-x-2">
        {items.map((item, index) => (
          <Navigationmenu
            key={index}
            navigateTrigger={item.name}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationItems;
