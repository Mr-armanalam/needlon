import Image from "next/image";

export default function ProductCardPreview({
  image,
  title,
  offer,
}: {
  image: string;
  title: string;
  offer: string;
}) {
  return (
    <div className="h-fit cursor-pointer transition hover:transition-discrete hover:-translate-1 bg-gradient-to-br from-stone-100 to-stone-200 hover:from-stone-100 hover:to-stone-50 min-w-[340px] rounded-lg p-6 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col md:flex-row gap-2">
      <div className="flex-1 mt-3">
        <div className="text-[10px] text-gray-600">
          <span className="font-semibold">4.5 ★★★★★</span> / 5
          <div className="text-[8px] text-gray-400">950 reviews</div>
        </div>

        <h2 className="mt-1 text-lg leading-6 font-garamond font-bold text-gray-900">
          The Classic
          <br />
          Denim Jacket
        </h2>

        <p className="mt-1 font-garamond text-xl font-semibold text-gray-900">
          - 79 <span className="text-lg font-medium">USD</span>
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

        <p className="text-sm font-semibold text-gray-700">S, M, L, XL</p>
      </div>

      <div className="flex-1  w-full flex justify-center relative">
        <div className="relative w-[140px] h-[170px] flex items-center justify-center">
          <Image
            fill
            src={image ?? "/images/image6.png"}
            alt="Denim Jacket"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
