import OrderView from "@/modules/orders/view/order-view";
import { GroupedOrder } from "@/app/api/orders/route";
import { cookies } from "next/headers";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.search || "";
  const cookie = await cookies();
  const cookieStore = cookie.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/orders?search=${searchQuery}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore, //TODO: BUILD REQUEST UI FOR GETTING COOKIES PERMISSION
      },
    }
  );

  const orders: GroupedOrder[] = res.status === 401 ? [] : await res.json();

  return <OrderView initialOrders={orders} initialSearch={searchQuery} />;
}
