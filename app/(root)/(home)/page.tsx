import HomeView from '@/modules/home/view/home-view'
import React from 'react'

import { Metadata } from 'next'

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

// import HomeView from "@/modules/home/view/home-view";
// import React from "react";

// import { Metadata } from "next";
// import { Button } from "@/components/ui/button";
// import ProductCardPreview from "@/modules/home/components/card/item-card";

// export const metadata: Metadata = {
//   title: "Needlon | home",
//   description: "A fashionable clothing tailoring service",
// };

// const page = () => {
//   return (
//     // <div className="px-8 rounded-sm my-2 pt-10 pb-20 bg-gray-100 ">
//     <div className="px-8 ">
//       <div className="bg-white overflow-x-auto">
//         <h1 className="pt-8 pl-8 text-3xl font-semibold font-garamond text-gray-950">
//           {"Heading"}
//         </h1>
//         <div className="flex gap-x-8 overflow-x-scroll-auto py-8 rounded-sm justify-between">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <ProductCardPreview key={i} />
//           ))}
//           <Button
//             type="button"
//             className="my-auto text-2xl px-2.5 rounded-r-none cursor-pointer h-[120px]"
//           >
//             &gt;
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
