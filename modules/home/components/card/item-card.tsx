import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductCardPreview() {
  return (
    <div className="h-fit bg-gradient-to-r from-stone-100 to-gray-200 w-[440px] mx-auto rounded-[32px] p-6 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col md:flex-row gap-2">
      <div className="flex-1/2 mt-6">
        <div className="text-[12px] text-gray-600">
          <span className="font-semibold">4.5 ★★★★★</span> / 5
          <div className="text-[10px] text-gray-400">950 reviews</div>
        </div>

        <h2 className="mt-2 text-2xl  font-garamond font-bold text-gray-900">
          The Classic
          <br />
          Denim Jacket
        </h2>

        <p className="mt-2 font-garamond text-3xl font-semibold text-gray-900">
          - 79 <span className="text-lg font-medium">USD</span>
        </p>

        <p className="mt-2 text-sm font-semibold text-gray-500 leading-4">
          Timeless style. Effortless cool.
        </p>

        <div className="mt-4 items-center gap-x-2 flex">
          <div className="flex items-center gap-2">
            <span className="size-[12px] rounded-full bg-black border border-gray-300" />
            <span className="size-[12px] rounded-full bg-blue-300 border border-gray-300" />
          </div>
          <p className="text-[12px] text-gray-600 font-medium">Black Work</p>
        </div>

        <p className="text-[12px] text-gray-600 font-semibold">Dark Wash</p>
        <p className="text-sm font-semibold text-gray-700">S, M, L, XL</p>

        <Button variant={'default'} className="mt-4 bg-gray-800 rounded-2xl flex items-center justify-center gap-3">
          <span>🛒</span> Add to Cart
        </Button>
      </div>

      <div className="flex-1/2  w-full flex justify-center relative">
        <div className="relative w-[210px] h-[300px] flex items-center justify-center">
          <Image
            fill
            src="/images/image6.png"
            alt="Denim Jacket"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
