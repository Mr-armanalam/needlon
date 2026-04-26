import NewItemView from "@/modules/new-in/view/new-item-view";
import { getNewSectionProduct } from "@/modules/shared/product-items/server/get-new-section-products";

const page = async() => {
  const newSectionProducts = (await getNewSectionProduct({ type: "best-sellers" })) || [];
  
  return <NewItemView newSectionProducts={newSectionProducts} />;
};

export default page;
