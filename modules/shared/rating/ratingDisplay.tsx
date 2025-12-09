import { RatingComponentProps } from "@/types/ratingTypes";
import { calculateRatingMetrics } from "@/utils/calculate-rating-metrics";
import { StarHalfIcon, StarIcon } from "lucide-react";
import React from "react";

const Star = ({ type, color, size }: { type: "full" | "half" | "empty" , color?: string, size?: number}) => {
  switch (type) {
    case "full":
      return (
        <span>
          <StarIcon size={size} fill={color} />
        </span>
      ); // Full Star
    case "half":
      return (
        <span>
          <StarHalfIcon size={size} fill={color} />
        </span>
      );
    case "empty":
      return (
        <span className="text-gray-500">
          <StarIcon size={size} />
        </span>
      ); // Empty Star
    default:
      return null;
  }
};

const RatingDisplay = ({ color='#FFDF00', avgRating,  ratings,size}: RatingComponentProps) => {
  const { fullStars, halfStar, emptyStars } =
    calculateRatingMetrics(ratings, 5, avgRating);

  const fullStarElements = Array(fullStars).fill(<Star color={color} size={size} type="full" />);
  const halfStarElements = Array(halfStar).fill(<Star color={color} size={size} type="half" />);
  const emptyStarElements = Array(emptyStars).fill(<Star color={color} size={size} type="empty" />);

  return (
    <div className="flex flex-col gap-[5px]">
      <div style={{color: color}} className=" leading-1 flex">
        {fullStarElements}
        {halfStarElements}
        {emptyStarElements}
      </div>
    </div>
  );
};

export default RatingDisplay;
