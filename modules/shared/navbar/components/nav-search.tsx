"use client";

import * as React from "react";
import { CornerDownRight } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { useCustomSearchParams } from "../../navigation/set-search-params";

const nav_data = {
  category_name: "Pants",
  items: [
    { id: "kjjjl", name: "Luxury pants" },
    { id: "jklj", name: "Linen pants" },
    { id: "dffd", name: "Strechible pants" },
  ],
};

export function NavSearch() {
  const [open, setOpen] = React.useState(false);
  const { setParam } = useCustomSearchParams();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen((previousState) => !previousState)}
        className="bg-[#cccccc]/40 transition-all hover:bg-muted border py-1 pl-4 pr-2 min-w-[210px] backdrop-blur-md rounded-md flex items-center"
      >
        Search
        <Kbd className="bg-muted ml-auto text-muted-foreground pointer-events-none inline-flex h-[26px] items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </Kbd>
      </div>
      <CommandDialog
        className="min-h-[380px]"
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Search clothes here..." />
        <CommandList className="no-scrollbar">
          <CommandEmpty>No results found.</CommandEmpty>
          {Array.from({ length: 2 }).map((_, i) => (
            <React.Fragment key={`group-${i}`}>
              <CommandGroup heading={nav_data.category_name}>
                {nav_data.items.map((item, k) => (
                  <CommandItem
                    onSelect={(value) => setParam({value: value.toLowerCase().toString(), navigate:true})}
                    className="mt-1"
                    key={`item-${i}-${k}`}
                  >
                    <CornerDownRight />
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
