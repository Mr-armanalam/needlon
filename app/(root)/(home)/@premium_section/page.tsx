import HomePremRecomLike from "@/modules/home/ui/home-prem-recom-like";
import { getProductByType } from "@/modules/shared/product-items/server/get-product-by-type";
import React from "react";

export const dynamic = "force-dynamic";

const page = async() => {
  const premiumItems = await getProductByType({type: 'premium'}) || [];
  
  return (
    <section >
      <HomePremRecomLike items={premiumItems} heading={"Premium Items"} />
    </section>
  );
};

export default page;
