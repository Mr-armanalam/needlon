import React from "react";

import { Metadata } from "next";
import SubcatSearch from "@/modules/home/components/hero-components/subcat-search";
import HeroSlider from "@/modules/home/components/hero-components/hero-slider";

export const metadata: Metadata = {
  title: "Needlon | home",
  description: "A fashionable clothing tailoring service",
};

export type heroProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  offer: string;
  slug: string;
  timestamp?: Date;
}


const page = async() => {

  const heroItemResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hero-items`);
  const heroItemResult = await heroItemResponse.json();
  const tailoringServices: heroProps[] = heroItemResponse.status !== 200 ? [] : heroItemResult?.items;
  
  const subcatItemResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sub-cat-search`);
  const subcatItemResult = await subcatItemResponse.json();
  const subCatSearches: Pick<heroProps, 'id' | 'name' | 'slug' | 'image' >[]= subcatItemResponse.status !== 200 ? [] : subcatItemResult?.items;
  
  
  return (
    <section className="px-8 mb-16 w-full">
      <SubcatSearch subCatSearchesItem={subCatSearches} />
      <HeroSlider tailoringServices={tailoringServices} />
    </section>
  );
};

export default page;
