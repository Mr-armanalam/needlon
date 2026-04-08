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
import ProductDescriptionn from "./product-description";
import { individualProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ProductCourusel = () => {
  const {item: productId} = useParams();
  
  const {data, status } = useQuery({
    queryKey: ["individual-product"],
    queryFn: async (): Promise<individualProduct> => {
      const response = await fetch(
        `/api/products/${productId}`,
      );
      const {productItem} = await response.json();
      return productItem ;
    },
  });

  const corouselImages = [data?.product_items.image, ...(data?.product_items.modalImage)?? []];
  
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        skipSnaps: false,
        containScroll: false,
      }}
      className="h-150 relative"
    >
      <CarouselContent className="pl-1 ">
        {corouselImages.length !== 0 &&
          corouselImages.map((image, index) => (
            <CarouselItem key={index} className="basis-1/3 pl-4 ol-1">
              <Card className="rounded-xs bg-[#eaeaea] py-0 border-0">
                <CardContent className="flex relative mt-auto h-150 items-center justify-center">
                  <Image
                    src={image ?? "/images/image1.png"}
                    alt="product image"
                    fill
                  />
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
      {data && <ProductDescriptionn productData={data} />}
    </Carousel>
  );
};

export default ProductCourusel;
