import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersSkeleton() {
  return (
    <div className="w-full px-8 space-y-10">
      <h1 className="text-3xl font-semibold">Your Orders</h1>

      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="flex gap-6 border-b pb-8">
        <Skeleton className="h-40 w-32 rounded-md" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-64" />   {/* Title */}
          <Skeleton className="h-4 w-20" />   {/* Size */}
          <Skeleton className="h-6 w-24" />   {/* Price */}

          <div className="flex gap-4 pt-2">
            <Skeleton className="h-10 w-28 rounded-full" /> {/* Order placed */}
            <Skeleton className="h-10 w-20 rounded-full" /> {/* Prepaid */}
          </div>
        </div>

        <div className="flex justify-end items-start">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="flex gap-6 border-b pb-8">
        <Skeleton className="h-40 w-32 rounded-md" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-64" />   {/* Title */}
          <Skeleton className="h-4 w-20" />   {/* Size */}
          <Skeleton className="h-6 w-24" />   {/* Price */}

          <div className="flex gap-4 pt-2">
            <Skeleton className="h-10 w-28 rounded-full" /> {/* Order placed */}
            <Skeleton className="h-10 w-20 rounded-full" /> {/* Prepaid */}
          </div>
        </div>

        {/* Delivery Date */}
        <div className="flex justify-end items-start">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
