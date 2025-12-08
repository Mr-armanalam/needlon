/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LucideTag } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { heroProps } from "@/app/(root)/(home)/@hero_section/page";


const HeroSlider = ({tailoringServices}:{tailoringServices: heroProps[]}) => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<any>(null);

  console.log(tailoringServices, 'kk');
  
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex cursor-pointer flex-col items-center">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
          dragFree: false, // smooth snap after swipe
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false, // autoplay continues after swipe
          }),
        ]}
        className="min-w-[95vw] bg-gradient-to-r from-stone-950 to-stone-800 rounded-sm flex relative h-[400px] mt-10 max-w-xs"
      >
        <CarouselContent>
          {tailoringServices.map((item, index) => (
            <CarouselItem className="flex justify-center pr-1" key={index}>
              <Card className="w-[90vw] rounded-none shadow-none border-none bg-gray-90">
                <CardContent className=" flex gap-x-36 aspect-auto text-white w-full items-center px-28 py-6">
                  <div className="flex-1">
                    <h1 className="text-6xl font-garamond">{item.name}</h1>
                    <p className="text-sm mt-8 pl-3 text-white/70">
                      {item.description}
                    </p>
                    <div className="mt-8 flex items-center ml-3 px-4 text-xs text-black font-bold rounded-sm py-2.5 w-fit bg-stone-200">
                      <LucideTag size={16} className="mr-1.5 text-red-700 " />
                      {item?.offer ?? "no offer"}
                    </div>
                  </div>
                  <div className="w-[300px] rounded-t-full rounded-b-3xl h-[300px] flex justify-center relative text-white">
                    <Image
                      className="z-50 absolute"
                      fill
                      src={item.image}
                      alt="offer item"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute border-none rounded-l-none text-gray-950 bg-zinc-100 rounded-r-sm h-[100px] left-0" />
        <CarouselNext className="absolute border-none rounded-r-none text-gray-950 rounded-l-sm bg-zinc-100 h-[100px] right-0" />
      </Carousel>

      {/* Dots indicator */}
      <div className="flex mt-4 gap-2">
        {tailoringServices.map((_, idx) => (
          <div
            key={idx}
            className={`w-4 h-1 rounded-full transition-all duration-500 ${
              current === idx
                ? "bg-gray-900 scale-100 scale-x-180 mx-1.5"
                : "bg-gray-400 scale-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
