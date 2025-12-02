import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { WishlistItemSkeleton } from "./wishlist_skeleton";

const loading = () => {
  return (
    <div className="px-6">
      <Skeleton className="w-32 h-12 rounded-md" />

      <WishlistItemSkeleton />
    </div>
  );
};

export default loading;
