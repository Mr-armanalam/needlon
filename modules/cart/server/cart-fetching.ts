import { CartItem } from "@/features/cart-slice";

export async function fetchCartSSR(userId: string): Promise<CartItem[]> {
  if (!userId) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/cart/${userId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data;
}
