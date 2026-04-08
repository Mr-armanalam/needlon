import { individualProduct } from "@/types/product";
import ProductCourusel from "../ui/product-courusel";

const ProductShowcase = ({productData}:{productData: individualProduct}) => {  
  return (
    <section className="relative">
      {productData && <ProductCourusel productData={productData} />}
    </section>
  );
};

export default ProductShowcase;
