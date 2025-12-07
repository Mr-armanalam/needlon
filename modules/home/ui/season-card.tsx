import Image from "next/image";
import React from "react";

const productData = {
  name: "Regal Embroidered",
  price: 350.0,
  category: "Luxury Traditional Wear",
  rating: 4.9,
  reviews: 1,
  // Using a placeholder image with the correct aspect ratio and dark background color.
  // In a real app, this would be a high-quality, cutout PNG image.
  imageUrl:
    "https://placehold.co/800x1200/0E1525/ffffff?text=Model+in+Regal+Set",
};

const SeasonCard = () => {
  return (
    <div className=" flex-1 flex flex-col py-10 bg-gradient-to-tl rounded-xs from-gray-950 to-gray-900">
      <div className="relative min-h-[300px] flex-1">
        <Image
          src={"/images/image2.png"}
          fill
          className="object-fill h-[300px]"
          alt="season image"
        />
      </div>
      <div className="text-white mt-6">
        <div className="h-2 -skew-8 bg-white" />
        <div className="relative px-6 pt-8 text-white">
          {/* Rating and Reviews */}
          <div className="">*****</div>

          {/* ProductData Name */}
          <h2 className="text-2xl font-extrabold leading-snug mb-2">
            {productData.name}
          </h2>

          {/* Price */}
          <p className="text-lg font-semibold">
            USD {productData.price.toFixed(2)}
          </p>

          {/* Category / Tagline */}
          <p className="text-sm text-gray-400 font-light">
            {productData.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
// import Image from 'next/image'
// import React from 'react'

// const SeasonCard = () => {
//   return (
//     <div className=' flex-1 flex py-10 bg-gradient-to-tl rounded-xs from-gray-950 to-gray-900'>
//       <div className="relative h-[400px] flex-1">
//         <Image src={'/images/image2.png'} fill className='object-fill' alt='season image' />
//       </div>
//     </div>
//   )
// }

// export default SeasonCard
