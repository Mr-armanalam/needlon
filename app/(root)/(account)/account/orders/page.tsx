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

  return <OrderView initialSearch={searchQuery} />;
}
