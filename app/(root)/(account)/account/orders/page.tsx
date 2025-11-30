// import OrderView from "@/modules/orders/view/order-view";
// import React from "react";

// const page = () => {
//   return <OrderView />;
// };

// export default page;


// app/orders/page.tsx

import OrderView from '@/modules/orders/view/order-view';
import { GroupedOrder } from "@/app/api/orders/route";

export default async function Page({ searchParams }: { searchParams: { search?: string } }) {
  const searchQuery = searchParams.search || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders?search=${searchQuery}`, {
    cache: "no-store",
    credentials: 'include'
  });

  const orders: GroupedOrder[] = res.status === 401 ? [] : await res.json();
  

  return <OrderView initialOrders={orders} initialSearch={searchQuery} />;
}
