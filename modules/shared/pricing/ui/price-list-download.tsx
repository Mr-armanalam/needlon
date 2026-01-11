import { Button } from "@/components/ui/button";
import React from "react";

const PriceListDownload = ({
  handleDownload,
  isGenerating,
}: {
  handleDownload: () => void;
  isGenerating: boolean;
}) => {
  return (
    <Button
      disabled={isGenerating}
      variant={"outline"}
      onClick={handleDownload}
      className="absolute ml-6  mt-6 cursor-pointer bg-white p-4 w-fit rounded-full"
    >
      Download
    </Button>
  );
};

export default PriceListDownload;
