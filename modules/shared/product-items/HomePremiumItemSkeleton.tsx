import { Skeleton } from "@/components/ui/skeleton";

export function PremiumItemSkeleton() {
  return (
    <div className="w-[450px] flex rounded-xl border bg-white shadow-sm p-4 h-fit gap-x-3">
      {/* Rating & reviews */}
      <div className="flex gap-y-3 flex-col">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        {/* Title */}
        <Skeleton className="h-5 w-40 mt-2" />
        {/* Price */}
        <Skeleton className="h-5 w-24" />
        {/* Description */}
        <Skeleton className="h-4 w-48" />
        {/* Color dots */}
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Sizes */}
        <Skeleton className="h-4 w-30" />
      </div>
       {/* Image */}
      <Skeleton className="h-50 w-[150px] rounded-xl" />
    </div>
  );
}