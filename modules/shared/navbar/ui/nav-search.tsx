"use client";

import * as React from "react";
import { CornerDownRight, Loader2 } from "lucide-react";

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
import { suggestionAndRecentSearch } from "@/types/product";
import SearchSuggestion from "../components/search-gesstion";

const nav_data = {
  category_name: "Pants",
  items: [
    { id: "kjjjl", name: "Luxury pants" },
    { id: "jklj", name: "Linen pants" },
    { id: "dffd", name: "Strechible pants" },
  ],
};

type presuggestion = {
  recent: suggestionAndRecentSearch[];
  suggested: suggestionAndRecentSearch[];
};

export function NavSearch() {
  const [open, setOpen] = React.useState(false);
  const { setParam } = useCustomSearchParams();

  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [suggestion, setsuggestion] = React.useState<presuggestion | null>(
    null
  );
  const [results, setResults] = React.useState<any>({});

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

  React.useEffect(() => {
    if (open && !suggestion) {
      fetch("/api/search/suggestion")
        .then((r) => r.json())
        .then(setsuggestion);
    }
  }, [open]);

  React.useEffect(() => {
    if (!query) {
      setResults({});
      return;
    }

    setLoading(true);

    const t = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const json = await res.json();
      setResults(json.suggestions);
      setLoading(false);
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

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
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search clothes here..."
        />
        <CommandList className="no-scrollbar">
          <CommandEmpty>No results found.</CommandEmpty>
          {loading && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          )}

          {!query && suggestion && (
            <>
              {suggestion?.recent.length > 0 && (
               <SearchSuggestion
                  heading_name={"Recent"}
                  recent={suggestion.recent}
                  handleOnSelect={(item: suggestionAndRecentSearch) => {
                    setParam({
                      value: item.category,
                      navigate: true,
                      path: item.subcategory,
                    });
                    setOpen(false);
                  }}
                />
              )}

              {suggestion?.suggested.length > 0 && (
                <SearchSuggestion
                  heading_name={"Suggested"}
                  recent={suggestion.suggested}
                  handleOnSelect={(item: suggestionAndRecentSearch) => {
                    setParam({
                      value: item.category,
                      navigate: true,
                      path: item.subcategory,
                    });
                    setOpen(false);
                  }}
                />
              )}
            </>
          )}

          {query &&
            !loading &&
            Object.entries(results).map((_, i) => (
              <React.Fragment key={`group-${i}`}>
                <CommandGroup heading={nav_data.category_name}>
                  {nav_data.items.map((item, k) => (
                    <CommandItem
                      onSelect={(value) =>
                        setParam({
                          value: value.toLowerCase().toString(),
                          navigate: true,
                        })
                      }
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
