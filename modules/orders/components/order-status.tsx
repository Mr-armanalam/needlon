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

type props = {
  image?: string;
  itemPrice: number;
  size?: string;
  properties?: string;
  itemName: string;
  productId: string;
};

const OrderStatus = ({
  image,
  itemPrice,
  size = "s",
  properties,
  itemName,
  productId,
}: props) => {
  const router = useRouter();
  return (
    <div className="border bg-stone-50 rounded-sm mt-0.5 mx-1">
      <div className="m-4 flex gap-x-4 ">
        <div className="relative h-[140px] w-[130px]">
          {image ? (
            <Image className="rounded-md" fill alt="order_image" src={image} />
          ) : (
            <div className="bg-stone-200 rounded h-[140px] w-[130px]" />
          )}
        </div>
        <div>
          <h2 className="text-xl line-clamp-2 text-gray-900 font-semibold">
            {itemName}
          </h2>
          <p className="text-sm">
            {size && `size: ${size}`} {properties}
          </p>
          <p className="font-medium text-stone-700 mt-2">₹ {itemPrice}</p>
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
      <Separator orientation="horizontal" />
      <div className="px-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold cursor-pointer text-blue-700">
              See All Updates -&gt;
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <OrderTimeline />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default OrderStatus;
