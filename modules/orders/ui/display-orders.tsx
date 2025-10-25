/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import NoUserAddress from "@/modules/account/shared/no-user-address";
import { format } from "date-fns";
import { BoxIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface props {
  loading: boolean;
  orders: any[];
}

const DisplayOrders = ({ loading, orders }: props) => {
  console.log(orders);

  return (
    <div className="mt-7">
      {loading ? (
        <p className="px-6">Loading orders...</p>
      ) : orders.length ? (
        <div>
          {orders.length != 0 &&
            orders?.map((item, index) => (
              <div
                key={index}
                className={`border-y no-scrollbar  border-stone-200 mb-1.5 flex`}
              >
                <div className="relative w-[180px] h-[180px]">
                  <Image src={item.image ?? ""} fill alt="wishlist items" />
                </div>
                <div className="relative w-full">
                  <p className="text-xs px-6 py-4 border-b shadow-xs">
                    ORDER PLACED
                  </p>
                  <div className="my-6 ml-6 flex-1 text-stone-800">
                    <h1 className="font-semibold">{item.productName}</h1>
                    <p className="text-sm pl-0.5 lowercase text-stone-600">
                      Size: {item.size}
                    </p>
                    <h2 className="text-xl font-semibold my-2">
                      ₹{item.price / 100}
                    </h2>
                    <p className="absolute bottom-6 right-4 text-stone-500 text-xs ">
                      Delivery expected on {format(item.createdAt, "dd MMMM")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        // <p className="text-gray-500">No orders found.</p>
        <NoUserAddress Icon={BoxIcon} description="No orders found" />
      )}
    </div>
  );
};

export default DisplayOrders;
