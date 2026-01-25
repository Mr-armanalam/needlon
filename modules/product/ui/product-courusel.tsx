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
    <Carousel className="h-134">
      <CarouselContent className="pl-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3 pl-4 ol-1">
              <Card className="rounded-xs bg-[#eaeaea] p-20 border-0 py-0">
                <CardContent className="flex relative h-100 items-center justify-center p-6">
                  <Image
                    src={"/images/image1.png"}
                    alt="product image"
                    fill
                  />

                  {/* {index !== 0 && (
                    <div className="bg-zinc-0 absolute w-full h-full bg-clip-padding backdrop-filter backdrop-blur-sm " />
                  )} */}
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
