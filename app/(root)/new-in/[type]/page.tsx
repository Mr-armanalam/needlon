import NewItemView from "@/modules/new-in/view/new-item-view";
import { getNewSectionProduct } from "@/modules/shared/product-items/server/get-new-section-products";

const page = async({params}:{params: Promise<{type: string}>}) => {
  const {type} = await params;

  const newSectionProducts = (await getNewSectionProduct({ type })) || [];
  
  return <NewItemView newSectionProducts={newSectionProducts} />;
};

export default page;
