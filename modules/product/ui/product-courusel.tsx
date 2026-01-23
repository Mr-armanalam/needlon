"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductCourusel = () => {
  return (
    <Carousel className="">
      <CarouselContent className="pl-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3 pl-2 ol-1">
              <Card className="rounded-xs bg-gray-100 border-0 py-0">
                <CardContent className="flex relative  h-140 items-center justify-center p-6">
                  <Image
                    src={"/images/image1.png"}
                    alt="product image"
                    fill
                  />

                  {index !== 0 && (
                    <div className="bg-zinc-0 absolute w-full h-full bg-clip-padding backdrop-filter backdrop-blur-sm " />
                  )}
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
};

export default ProductCourusel;
