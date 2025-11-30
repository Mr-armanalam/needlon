import WishlistView from "@/modules/account/view/wishlist-view";
import { fetchWishlist, WishlistItem } from "@/features/wishlist-slice";
import { store } from "@/store/store";
import { auth } from "@/auth";

export default async function WishlistPage() {
  const session = await auth();
  const userId = session?.user?.id;
  let serverWishlist: WishlistItem[] = [];

  if (userId) {
    const action = fetchWishlist(userId);
    const result = await store.dispatch(action);
    serverWishlist = Array.isArray(result?.payload) ? result.payload : [];
  }

  return <WishlistView serverWishlist={serverWishlist} userId={userId} />;
}
