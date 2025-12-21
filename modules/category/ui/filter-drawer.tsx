"use client";

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

interface FilterDrawerProps {
  category: string;
  setFilterOpen: (data: boolean) => void;
  filterOpen: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  slug: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  slug: string;
  options: FilterOption[];
}

const FilterDrawer = ({
  category,
  setFilterOpen,
  filterOpen,
}: FilterDrawerProps) => {
  const [filters, setFilters] = useState<FilterGroup[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- FETCH FILTERS ---------------- */
  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetch(`/api/filters?category=${category}`);
      const data = await res.json();

      setFilters(data.filters);
      setTotalResults(data.totalResults);
    };

    fetchFilters();
  }, [category]);

  /* ---------------- SYNC FROM URL ---------------- */
  useEffect(() => {
    const params: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      params[key] = value.split(",");
    });

    setSelectedFilters(params);
  }, [searchParams]);

  /* ---------------- HANDLE CHECKBOX ---------------- */
  const handleFilterChange = (
    groupSlug: string,
    optionSlug: string,
    checked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(selectedFilters,'kj');
        

    setSelectedFilters((prev) => {
      const existing = prev[groupSlug] || [];
      const updated = checked
        ? [...existing, optionSlug]
        : existing.filter((v) => v !== optionSlug);

      if (updated.length > 0) {
        params.set(groupSlug, updated.join(","));
      } else {
        params.delete(groupSlug);
      }
      // router.push(`?${params.toString()}`);

      return { ...prev, [groupSlug]: updated };
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <AnimatePresence>
      {filterOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setFilterOpen(false)}
          />

          <motion.div
            className="relative w-80 bg-white h-full py-6 z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex px-6 justify-between items-center">
              <h2 className="text-lg font-bold">
                FILTER – {category.replace("-", " ")}
              </h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>

            <p className="mb-4 px-6">{totalResults} Results</p>
            <Separator />

            <div className="flex flex-col px-6">
              {filters.map((group) => (
                <div key={group.id}>
                  <Accordion
                    defaultValue={filters[0].slug}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value={group.slug}>
                      <AccordionTrigger className="hover:no-underline">
                        {group.name}
                      </AccordionTrigger>

                      <AccordionContent className="flex flex-col gap-3">
                        {group.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-start gap-3"
                          >
                            <Checkbox
                              checked={                                
                                selectedFilters[group.slug]?.includes(
                                  option.slug
                                ) || false
                              }
                              onCheckedChange={(checked) =>
                                handleFilterChange(
                                  group.slug,
                                  option.slug,
                                  Boolean(checked)
                                )
                              }
                            />
                            <Label>
                              {option.label}
                              {option.count !== undefined && (
                                <span className="ml-2 text-muted-foreground">
                                  ({option.count})
                                </span>
                              )}
                            </Label>
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
