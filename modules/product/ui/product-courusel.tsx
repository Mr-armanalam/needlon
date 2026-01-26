"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import ProductDescriptionn from "../components/product-description";
import { individualProduct, productDataType } from "@/types/product";

const ProductCourusel = ({ productItem }: { productItem: productDataType }) => {
  const corouselImages = [productItem.image, ...productItem.modalImage];
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="h-150 relative"
    >
      <CarouselContent className="pl-1">
        {corouselImages.length !== 0 &&
          corouselImages.map((image, index) => (
            <CarouselItem key={index} className="basis-1/3 pl-4 ol-1">
              <Card className="rounded-xs bg-[#eaeaea] h-150 p-10 border-0 py-0">
                <CardContent className="flex relative mt-auto h-140 items-center justify-center p-6">
                  <Image src={image} alt="product image" fill />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious
        size={"xl"}
        className="border-none cursor-pointer shadow-lg left-2"
      />
      <CarouselNext
        size={"xl"}
        className=" left-98 cursor-pointer border-none shadow-lg"
      />
      <ProductDescriptionn />
    </Carousel>
  );
};

export default ProductCourusel;
