import HomePremRecomLike from "@/modules/home/ui/home-prem-recom-like";
import { getProductByType } from "@/modules/shared/product-items/server/get-product-by-type";
import React from "react";

const page = async() => {
  const userLikeItem = await getProductByType({type: 'user_like'}) || [];
  return (
    <section>
      <HomePremRecomLike items={userLikeItem} heading={"You may like"} />
    </section>
  );
};

export default page;
