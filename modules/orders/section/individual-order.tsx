"use client";
import React, { useEffect, useState } from "react";
import OrderDetails from "../components/oder-details";
import OrderStatus from "../components/order-status";
import { useParams } from "next/navigation";
import { Address } from "@/features/address-slice";
import OrderTimeline from "../components/order-timeline";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OrderItemProp {
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
}

const IndividualOrder = () => {
  const [orderItem, setOrderItem] = useState<OrderItemProp>();
  const params = useParams();
  const orderId = params.order;

  async function fetchOrderById() {
    if (!orderId) return;
    const res = await fetch(`/api/orders/${orderId}`);
    if (!res.ok) {
      console.error("Failed to fetch order:", res.statusText);
      return;
    }
    const result = await res.json();
    setOrderItem(result.order);
  }

  console.log(orderItem);

  useEffect(() => {
    if (orderId) fetchOrderById();
  }, [orderId]);

  return (
    <div className="px-6">
      <h1 className="text-3xl mb-2 font-garamond font-semibold text-gray-900">
        Order Details
      </h1>
      {orderItem && (
        <OrderDetails
          order_date={orderItem.orderDate}
          order_id={orderItem.orderId}
          shipping_address={orderItem.shippingAddress}
          shippingCharge={orderItem.shippingCharge}
          pod_charge={orderItem.podCharge}
          payment_method={orderItem.paymentMode}
          itemPrice={orderItem.priceAtperchage}
        />
      )}
      <OrderStatus />
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold text-blue-700">See All Updates -&gt;</AccordionTrigger>
          <AccordionContent className="p-4">
            <OrderTimeline />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default IndividualOrder;
