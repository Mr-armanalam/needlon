import NewItemView from "@/modules/new-in/view/new-item-view";
import { getProductByType } from "@/modules/shared/product-items/server/get-product-by-type";

const page = async() => {
  const premiumItems = (await getProductByType({ type: "premium" })) || [];
  return <NewItemView premiumItems={premiumItems} />;
};

export default page;
