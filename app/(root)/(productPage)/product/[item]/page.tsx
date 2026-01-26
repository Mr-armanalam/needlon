import ProductPage from "@/modules/product/view/product-page";
import React from "react";

const page = async ({ params }: { params: Promise<{ item: string }> }) => {
  const { item } = await params;
  return <ProductPage productId={item} />;
};

export default page;
