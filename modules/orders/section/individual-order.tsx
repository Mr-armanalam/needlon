"use client";
import React, { useEffect, useState } from "react";
import OrderDetails from "../components/oder-details";
import OrderStatus from "../components/order-status";
import { useParams } from "next/navigation";
import { Address } from "@/features/address-slice";

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
  itemName: string;
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

  useEffect(() => {
    if (orderId) fetchOrderById();
  }, [orderId]);

  return (
    <div className="px-6 overflow-y-scroll no-scrollbar">
      <h1 className="text-3xl mb-2 font-garamond font-semibold text-gray-900">
        Order Details
      </h1>
      {orderItem && (
        <>
          <OrderDetails
            order_date={orderItem.orderDate}
            order_id={orderItem.orderId}
            shipping_address={orderItem.shippingAddress}
            shippingCharge={orderItem.shippingCharge}
            pod_charge={orderItem.podCharge}
            payment_method={orderItem.paymentMode}
            itemPrice={orderItem.priceAtperchage}
          />
          <OrderStatus
            itemName={orderItem?.itemName}
            itemPrice={orderItem?.priceAtperchage}
            image={orderItem.image}
            properties={orderItem.orderProperties}
          />
        </>
      )}
    </div>
  );
};

export default IndividualOrder;
