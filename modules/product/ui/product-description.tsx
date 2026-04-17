import { Separator } from "@/components/ui/separator";
import {
  fetchWishlist,
  initializeGuestWishlist,
} from "@/features/wishlist-slice";
import { useAppDispatch } from "@/store/store";
import { individualProduct } from "@/types/product";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ProductDescriptionHeading from "../components/product-description-heading";
import ProductDescriptionCat from "../components/product-description-cat";
import ProductDescriptionEvent from "../components/product-description-event";

const ProductDescriptionn = ({
  productData,
}: {
  productData: individualProduct;
}) => {

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    } else {
      const local = localStorage.getItem("wishlist"); // Load from localStorage for guests
      if (local) {
        dispatch(initializeGuestWishlist());
      }
    }
  }, [userId, dispatch]);

  return (
    <div className="absolute p-6 top-16 border dark:bg-black dark:border-gray-600 border-stone-100 bottom-16 rounded-sm right-10 left-123 bg-stone-50">
      <ProductDescriptionHeading
        productItem={productData.product_items}
        CatType={productData?.product_category?.CatType!}
        SubCatType={productData.product_category?.SubCatType!}
        contentTag={productData.product_category?.contentTag!}
        userId={userId}
        dispatch={dispatch}
      />
      <Separator className="mt-5 " />

      <ProductDescriptionCat
        productItem={productData.product_items}
        productFilterData={productData.productFilterData}
      />

      <ProductDescriptionEvent
        productItem={productData.product_items}
        dispatch={dispatch}
        userId={userId}
      />
    </div>
  );
};

export default ProductDescriptionn;
