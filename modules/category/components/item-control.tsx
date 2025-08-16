import { useRouter } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type param = {
  sort: string;
  category: string;
  setFilterOpen: (data: boolean) => void;
};

const ItemControl = ({ sort, category, setFilterOpen }: param) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4">
        <Button className="rounded-full border-gray-900 cursor-pointer" variant={"outline"}>
          Cutton <span className="text-lg">×</span>
        </Button>
        <Button className="rounded-full cursor-pointer" variant={"default"}>
          Clear 
        </Button>
      </div>
      <div className="flex gap-4">
        <Select
          value={sort}
          onValueChange={(sortby) =>
            router.push(`/ready-to-wear/${category}?sort=${sortby}`)
          }
        >
          <SelectTrigger className="w-[200px] text-gray-900 min-h-10 border-stone-300 shadow-none rounded-xs focus-visible:outline-none h-[60px]">
            <SelectValue className="text-stone-300/70" placeholder="Featured" />
          </SelectTrigger>
          <SelectContent className="rounded-xs gap-y-12">
            <SelectItem value="featured">Sort By: Featured</SelectItem>
            <SelectItem value="priceHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Button */}
        <Button
          variant={"secondary"}
          onClick={() => setFilterOpen(true)}
          className="border bg-transparent min-h-10 shadow-none border-stone-300 px-4 py-2 rounded-xs text-sm"
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default ItemControl;
