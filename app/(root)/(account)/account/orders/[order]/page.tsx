import { Address } from "@/features/address-slice";
import IndividualOrder from "@/modules/orders/section/individual-order";
import { cookies } from "next/headers";
import React from "react";

export const dynamic = "force-dynamic";

export interface OrderItemProp {
  orderDate: Date;
  orderId: string;
  shippingAddress: Address;
  paymentMode: string;
  shippingCharge: number;
  podCharge: number;
  priceAtperchage: number;
  productId: string;
  image: string;
  orderProperties?: string;
  itemName: string;
  couponDiscount: number;
  totalPurchasePrice: number;
}

async function getOrder(orderId: string, cookieStore: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/orders/${orderId}`,
    {
      cache: "no-store",
      headers: {Cookie: cookieStore },
    }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.order as OrderItemProp[];
}

const page = async ({ params }: { params: Promise<{ order: string }> }) => {
  const { order: orderId } = await params;

  const cookie = await cookies();
  const cookieStore = cookie.toString();
  const orderItem = await getOrder(orderId, cookieStore);

  return (
    <div className=" overflow-y-scroll no-scrollbar">
      <IndividualOrder orderItem={orderItem} />
    </div>
  );
};

export default page;

