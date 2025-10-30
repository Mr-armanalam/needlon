import { Separator } from "@/components/ui/separator";
import React from "react";

interface props {
  order_date: Date;
  order_id: string;
  shipping_address: string[];
  payment_method: string;
  shipping: number;
  pod_charge: number;
  total: number;
}
const OrderDetails = ({
  order_date,
  order_id,
  shipping_address,
  payment_method,
  shipping,
  pod_charge,
  total,
}: props) => {
  return (
    <div className="px-1 text-gray-900">
      <div className="flex items-center text-sm gap-x-4">
        <p>Order placed 5 April 2025</p>
        <div className="h-[15px] w-0.5 bg-gray-300 border-l"  />
        <p>Order number 404-1505497-2358746</p>
      </div>
      <div className="flex border bg-stone-50 rounded p-4 text-sm mt-2 gap-x-8 justify-between">
        <div className="flex-1/3">
          <h2 className="font-semibold">Ship to</h2>
          <p className="text-wrap">
            Arman Alam 0077 Agarwa ,Motihari , ward no.-17 MOTIHARI, BIHAR 845401
            India
          </p>
        </div>
        <div className="flex-1/3">
          <h3 className="font-semibold">Payment method</h3>
          <p>Pay on Delivery</p>
        </div>
        <div className="flex-1/3">
          <h4 className="font-semibold">Order Summary</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
