"use client";
import React from "react";
import Heading from "../section/heading";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ItemControl from "../components/item-control";
import Product from "../ui/product";
import FilterDrawer from "../ui/filter-drawer";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  size: string[];
};

const CategoryView = () => {
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const sort = searchParams.get("sort") || "featured";

  useEffect(() => {
    fetch(`/api/products?category=${params.category}&sort=${sort}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [params.category, sort]);
  return (
    <div className="px-6 py-8">
      <Heading />
      <ItemControl
        sort={sort}
        category={params?.category}
        setFilterOpen={setFilterOpen}
      />
      <Product />
      <FilterDrawer
        filterOpen={filterOpen}
        category={params?.category}
        setFilterOpen={setFilterOpen}
      />
    </div>
  );
};

export default CategoryView;
