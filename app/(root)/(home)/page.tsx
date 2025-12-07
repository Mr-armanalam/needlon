import HomeView from "@/modules/home/view/home-view";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Needlon | home",
  description: "A fashionable clothing tailoring service",
};

const page = () => {
  return (
    <div>
      <HomeView />
    </div>
  )
}

export default page

// TODO: We have to implement get cookiew permission ui


// export const demoRatings: RatingData[] = [
//   { id: 1, rating: 5, comment: 'Excellent product!' },
//   { id: 2, rating: 4, comment: 'Very good, minor issues.' },
//   { id: 3, rating: 3, comment: 'It is okay, meets expectations.' },
//   { id: 4, rating: 5, comment: 'Perfect, would recommend.' },
// ];


// export default function HomePage() {
//   return (
//     <main>
//       <h1>Product Ratings</h1>
//       <RatingDisplay size={12} ratings={demoRatings} />
//     </main>
//   );
// }

