import { calculateRatingMetrics } from "@/lib/utils";
import { RatingComponentProps } from "@/types/ratingTypes";
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

const RatingDisplay = ({ color='#FFDF00', ratings,size, maxRating = 5 }: RatingComponentProps) => {
  const { fullStars, halfStar, emptyStars } =
    calculateRatingMetrics(ratings, maxRating);

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
