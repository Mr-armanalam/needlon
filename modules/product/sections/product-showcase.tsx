import { individualProduct } from "@/types/product";
import ProductCourusel from "../ui/product-courusel";

const ProductShowcase = ({productItem}:{productItem: individualProduct}) => {  
  return (
    <section className="relative">
      <ProductCourusel productItem={productItem.product_items} />
    </section>
  );
};

export default ProductShowcase;
