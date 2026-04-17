"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import OrderTimeline from "../components/order-timeline";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import OrderRating from "../ui/order-rating";
import Link from "next/link";

type props = {
  image?: string;
  itemPrice: number;
  size?: string;
  properties?: string;
  itemName: string;
  productId: string;
  orderItemId: string;
};

const OrderStatus = ({
  image,
  itemPrice,
  size = "s",
  properties,
  itemName,
  productId,
  orderItemId,
}: props) => {
  const router = useRouter();
  return (
    <div className="border dark:bg-white/6 bg-white rounded-sm mt-0.5 mx-1">
      <div className="m-4 flex gap-x-4 ">
        <Link
          href={`/product/${productId}`}
          className="relative h-35 w-32.5"
        >
          {image ? (
            <Image
              className="rounded-md "
              fill
              alt="order_image"
              src={image}
            />
          ) : (
            <div className="bg-white dark:bg-white/6 rounded h-35 w-32.5" />
          )}
        </Link>
        <div>
          <h2 className="text-xl line-clamp-2 dark:text-white text-gray-900 font-semibold">
            {itemName}
          </h2>
          <p className="text-sm">
            {size && `size: ${size}`} {properties}
          </p>
          <p className="font-medium dark:text-white/70 text-stone-700 mt-2">₹ {itemPrice}</p>
          <div className="flex gap-x-6">
            <Button
              onClick={() => router.push(`/product/${productId}`)}
              variant={"outline"}
              className="rounded-full text-xs mt-4 cursor-pointer"
            >
              View product
            </Button>
            <Button className="rounded-full text-xs mt-4 cursor-pointer">
              write a product review
            </Button>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="bg-gray-100 dark:bg-gray-800" />
      <div className="px-4">
        <Accordion
          type="single"
          collapsible
          className="w-full bg-whit rounded-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold cursor-pointer text-blue-700">
              See All Updates -&gt;
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-white dark:bg-black rounded-md mb-4">
              <OrderTimeline />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator orientation="horizontal" className="bg-gray-100 dark:bg-gray-800" />

      <OrderRating orderItemId={orderItemId} productId={productId} />
    </div>
  );
};

export default OrderStatus;
