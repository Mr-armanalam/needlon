import React, { ElementType } from "react";

type prop = {
  Icon: ElementType;
  description: string;
};

const NoUserAddress = ({ Icon, description }: prop) => {
  return (
    <div className="flex flex-col items-center justify-center mt-[200px]">
      <Icon size={27} className={"w-22 h-22 text-stone-200 mb-2"} />
      <h2 className="font-semibold text-stone-200 text-2xl">{description}</h2>
    </div>
  );
};

export default NoUserAddress;
