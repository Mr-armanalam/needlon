import { PremiumItemSkeleton } from '@/modules/shared/product-items/HomePremiumItemSkeleton';
import React from 'react'

const loading = () => {
  return (
      <div className=" bg-stone-100 p-2">
        <div className="bg-white rounded-sm p-6 w-full">
          <h2 className="text-3xl font-bold font-garamond mb-4">You may like</h2>
          <div className="flex gap-4 no-scrollbar overflow-x-auto no-scrollbar py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <PremiumItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default loading