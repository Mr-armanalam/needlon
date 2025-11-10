/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupedOrder } from "@/app/api/orders/route";
import { Button } from "@/components/ui/button";
import NoUserAddress from "@/modules/account/shared/no-user-address";
import { format } from "date-fns";
import { BoxIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface props {
  loading: boolean;
  orders: GroupedOrder[];
}

const DisplayOrders = ({ loading, orders }: props) => {
  return (
    <div className="mt-7 overflow-y-scroll no-scrollbar">
      {loading ? (
        <p className="px-6">Loading orders...</p>
      ) : orders.length ? (
        <div className="overflow-y-scroll no-scrollbar ">
          {orders.length != 0 &&
            orders?.map((order, index) => (
              <Link
                href={`/account/orders/${order.orderId}`}
                key={index}
                className={`border-y hover:shadow-md cursor-pointer border-stone-200 mb-1.5 hover:mb-2.5 flex`}
              >
                <div className="relative w-[190px] h-[190px]">
                  <Image src={order.items[0].image ?? ""} fill alt="wishlist items" />
                </div>
                <div className="relative w-full">
                  <div className="my-6 ml-6 flex-1 text-stone-800">
                    <h1 className="font-semibold">{order.items[0].productName}</h1>
                    <p className="text-sm pl-0.5 lowercase text-stone-600">
                      Size: {order.items[0].properties}
                    </p>
                    <h2 className="text-2xl font-semibold my-2">
                      ₹{order.total}
                    </h2>
                    <div className="flex gap-x-6">
                      <Button className="text-xs rounded-full mt-3">
                        Order placed
                      </Button>
                      <Button variant={"outline"} className="text-xs rounded-full mt-3">
                        Prepaid
                      </Button>
                    </div>
                    <p className="absolute bottom-6 right-4 text-stone-500 text-xs ">
                      Delivery expected on {format(String(order.createdAt), "dd MMMM")}
                    </p>
                  </div>
                </div>
              </Link>
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
