"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function ProductCard({
  image,
  title,
  offer,
}: {
  image: string;
  title: string;
  offer: string;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // only animate once
    threshold: 0.2, // trigger when 20% visible
  });

  return (
    <div className=" bg-white flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={inView ? { y: [-100, 10, 0], opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          times: [0, 0.7, 1],
        }}
        className="relative w-[220px] h-[220px]"
      >
        <Image src={image || ""} alt={title} fill className="object-contain" />
      </motion.div>
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className=" text-md font-medium">{ offer}</p>
    </div>
  );
}
