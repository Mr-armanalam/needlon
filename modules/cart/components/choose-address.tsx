import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Address } from "@/types/address";

type props = {
  addresses: Address[];
  currentAddressId?: string;
  onSelectAddress: (address: Address) => void;
};

export function ChooseAddress({
  addresses,
  currentAddressId,
  onSelectAddress,
}: props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Change
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-[420px]">
        <RadioGroup
          value={currentAddressId}
          className="flex flex-col gap-y-4"
        >
          {addresses.length >= 0 &&
            addresses?.map((item, i) => (
              <div
                onClick={() => onSelectAddress(item)}
                key={i}
                className="bg-stone-200 items-center gap-x-4 flex rounded-md py-3 px-4 cursor-pointer"
              >
                <RadioGroupItem
                  color="white"
                  value={item.id}
                  id={item.id}
                  className="bg-white border border-gray-400"
                />
                <Label
                  htmlFor={item.id}
                  className="flex flex-col cursor-pointer items-start"
                >
                  <p className="font-semibold text-gray-950">
                    {`${item.name}, ${item.pincode}`}
                  </p>
                  <p className="text-sm text-stone-600 line-clamp-1">
                    {`${item.address},${item.phone}, ${item.landmark},${" "}
                    ${item.locality}`}
                  </p>
                </Label>
              </div>
            ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}

