import { RatingData } from "@/types/ratingTypes";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateRatingMetrics = (
  ratings: RatingData[],
  maxRating: number = 5
) => {
  if (ratings.length === 0) {
    return {
      averageRating: 0,
      fullStars: 0,
      halfStar: 0,
      emptyStars: maxRating,
    };
  }

  const totalRating = ratings.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = totalRating / ratings.length;

  const fullStars = Math.floor(averageRating);

  const decimalPart = averageRating - fullStars;
  const halfStar = decimalPart >= 0.25 && decimalPart < 0.75 ? 1 : 0;
  
  const emptyStars = maxRating - fullStars - halfStar;

  return {
    averageRating: parseFloat(averageRating.toFixed(2)),
    fullStars,
    halfStar,
    emptyStars,
  };
};