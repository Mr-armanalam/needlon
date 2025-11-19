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
  ratingId?: string;
  orderProperties?: string;
  itemName: string;
  couponDiscount: number;
  totalPurchasePrice: number;
}

const IndividualOrder = () => {
  const [orderItem, setOrderItem] = useState<OrderItemProp[]>();
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

  const firstOrder = orderItem?.[0];

  return (
    <div className="px-6 overflow-y-scroll no-scrollbar">
      <h1 className="text-3xl mb-2 font-garamond font-semibold text-gray-900">
        Order Details
      </h1>
      {firstOrder && (
        <>
          <OrderDetails
            noOfItem={orderItem.length}
            order_date={firstOrder.orderDate ?? new Date()}
            order_id={firstOrder.orderId}
            shipping_address={firstOrder.shippingAddress}
            shippingCharge={firstOrder.shippingCharge}
            pod_charge={firstOrder.podCharge}
            payment_method={firstOrder.paymentMode}
            itemPrice={firstOrder.priceAtperchage}
            totalPurchasePrice={firstOrder.totalPurchasePrice}
            couponDiscount={firstOrder.couponDiscount}
          />

          {orderItem?.map((order, index) => (
            <OrderStatus
              key={index}
              ratingId={order.ratingId}
              orderIndex ={index}
              productId={order.productId}
              itemName={order?.itemName}
              itemPrice={order?.priceAtperchage}
              image={order?.image}
              properties={order?.orderProperties}
              orderItemId={order.orderId}
            />
          ))}

        </>
      )}
    </div>
  );
};

export default IndividualOrder;
