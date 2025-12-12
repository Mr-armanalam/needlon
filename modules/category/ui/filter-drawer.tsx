import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

interface filterParam {
  category: string;
  setFilterOpen: (data: boolean) => void;
  filterOpen: boolean;
}

const filterdata = [
  {
    slug: "Shirt",
    name: "material",
    type: ["Cashmere", "Cotton", "Linen", "Silk", "Wool"],
  },
  {
    slug: "Shirt",
    name: "pattern",
    type: ["Checked", "Printed", "Solid", "Striped"],
  },
  {
    slug: "Shirt",
    name: "Collar",
    type: [
      "Classic Collar",
      "Cuban Collar",
      "Guru Collar",
      "One Piece Collar",
      "Polo Collar",
      "Rounded Neck",
      "Semi Spread Collar",
      "Spread Collar",
      "Standing Collar",
      "Vareuse Collar",
    ],
  },
  {
    slug: "Shirt",
    name: "Sleeve length",
    type: ["Short Sleeve", "Long Sleeve", "Sleeveless"],
  },
  {
    slug: "Shirt",
    name: "Style",
    type: ["Casual", "Formal", "Eveningwear"],
  },
  {
    slug: "Shirt",
    name: "collection",
    type: ["Couture", "Fashion Show", "Luxury Leisurewear", "Luxury Tailoring"],
  },
  {
    slug: "Shirt",
    name: "Color",
    type: [
      "Black",
      "Blue",
      "Brown",
      "Grey",
      "Light Blue",
      "Natural",
      "Orange",
      "Pink",
      "Red",
      "White",
      "Yellow",
    ],
  },

  {
    slug: "Shirt",
    name: "SIZE",
    type: [
      "XS(35/36)",
      "S(37/38)",
      "M(39/40)",
      "L(41/42)",
      "XL(43/44)",
      "XXL(45/46)",
      "3XL(47/48)",
    ],
  },
];

const FilterDrawer = ({ category, setFilterOpen, filterOpen }: filterParam) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    category: string,
    value: string,
    checked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    setSelectedFilters((prev) => {
      const existing = prev[category] || [];
      const updated = checked
        ? [...existing, value]
        : existing.filter((v) => v !== value);

      // const params = new URLSearchParams(searchParams.toString());
      if (updated.length > 0) {
        params.set(category, updated.join(","));
      } else {
        params.delete(category);
      }
      // router.push(`?${params.toString()}`);

      return { ...prev, [category]: updated };
    });
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const filters: Record<string, string[]> = {};
    filterdata.forEach(({ name }) => {
      const values = searchParams.get(name)?.split(",").filter(Boolean) || [];
      filters[name] = values;
    });
    setSelectedFilters(filters);
  }, [searchParams]);

  return (
    <AnimatePresence>
      {filterOpen && (
        <motion.div
          className="fixed inset-0  z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/30 bg-opacity-40"
            onClick={() => setFilterOpen(false)}
          />
          <motion.div
            className="relative w-80 no-scrollbar bg-white h-full py-6 z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex px-6 justify-between items-center ">
              <h2 className="text-lg font-bold">
                FILTER - {category.replace("-", " ")}
              </h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="mb-4 px-6">93 Result</p>
            <Separator />
            <div className="flex flex-col px-6">
              {filterdata?.map(({ name, type }, i) => (
                <div key={i}>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={filterdata[0].name}
                  >
                    <AccordionItem value={name}>
                      <AccordionTrigger className="hover:no-underline">
                        {name}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        {type?.map((itemType, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Checkbox
                              checked={
                                selectedFilters[name]?.includes(itemType) ||
                                false
                              }
                              value={itemType}
                              onCheckedChange={(isChecked) =>
                                handleFilterChange(
                                  name,
                                  itemType,
                                  Boolean(isChecked)
                                )
                              }
                              id="toggle"
                            />
                            <Label htmlFor="toggle">{itemType}</Label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Separator />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;
