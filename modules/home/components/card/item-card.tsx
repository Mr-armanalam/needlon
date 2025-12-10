import RatingDisplay from "@/modules/shared/rating/ratingDisplay";
import { ClientProductItem } from "@/types/product";
import Image from "next/image";

export default function ProductCardPreview({
  item
}: {
  item: ClientProductItem;
}) {
  return (
    <div className="h-fit cursor-pointer transition hover:transition-discrete hover:-translate-1 bg-gradient-to-br from-stone-100 to-stone-200 hover:from-stone-100 hover:to-stone-50 min-w-[340px] rounded-lg p-6 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col md:flex-row gap-2">
      <div className="flex-1 mt-3">
        <div className="text-[10px] text-gray-600">
          <div className="flex gap-x-1 items-center font-semibold">
           <span className="mb-[1px]">{item.averageRating}</span>
             <RatingDisplay color="#4a5565 " size={9} avgRating={item.averageRating} />
             / 5
            </div> 
          <div className="text-[9px] text-gray-400">{item.reviewCount} reviews</div>
        </div>

        <h2 className="mt-1 text-lg line-clamp-2 leading-6 font-garamond font-bold text-gray-900">
          {item.name}
        </h2>

        <p className="mt-1 font-garamond text-xl font-semibold text-gray-900">
          {Math.ceil(Number(item.price))} <span className="text-xl font-semibold">₹</span>
        </p>

        <p className="mt-1 text-[10px] font-semibold text-gray-500 leading-4">
          Timeless style. Effortless cool.
        </p>

        <div className="mt-2 items-center gap-x-2 flex">
          <div className="flex items-center gap-1">
            <span className="size-[10px] rounded-full bg-black border border-gray-300" />
            <span className="size-[10px] rounded-full bg-blue-300 border border-gray-300" />
          </div>
          <p className="text-[10px] text-gray-600 font-medium">Black Work</p>
        </div>

        <p className="text-sm font-semibold text-gray-700">{item.sizes?.toString()}</p>
      </div>

      <div className="flex-1  w-full flex justify-center relative">
        <div className="relative w-[140px] h-[170px] flex items-center justify-center">
          <Image
            fill
            src={item.image ?? "/images/image6.png"}
            alt="Denim Jacket"
            className="object-contain rounded-4xl max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
