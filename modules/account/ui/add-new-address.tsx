"use client";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { registerAddress } from "../server/address-controller";

export const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Number must be at least 10 characters.",
  }),
  pincode: z.string().min(6, {
    message: "Pincode must be at least 6 numbers.",
  }),
  locality: z.string().min(2, {
    message: "Locality must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  landmark: z.string().min(2, {
    message: "Landmark must be at least 2 characters.",
  }),
  alternate_phone: z.string(),
});

type AddressFormData = z.infer<typeof FormSchema> & { id?: string };

type Props = {
  setrealTimeAddressStatus: (saved: boolean) => void;
  editingAddress?: AddressFormData | null;
  clearEditing?: () => void;
  accordionValue: string | undefined;
  setAccordionValue: (state: string | undefined) => void;
};

const AddNewAddress = ({
  setrealTimeAddressStatus,
  editingAddress,
  clearEditing,
  setAccordionValue,
  accordionValue,
}: Props) => {
  const { data: session } = useSession();
  const [allState, setAllState] = useState<
    { name: string; state_code: string }[]
  >([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      alternate_phone: "",
    },
  });

  const clearAddressForm = () => {
    form.reset();
    clearEditing?.();
    setAccordionValue(undefined);
  };

  useEffect(() => {
    if (editingAddress) {
      form.reset(editingAddress);
      setAccordionValue("item-1");
    } else {
      setAccordionValue(undefined);
      form.reset();
    }
  }, [editingAddress, setAccordionValue, form]);

  useEffect(() => {
    if (editingAddress) {
      form.reset(editingAddress);
    }
  }, [editingAddress, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await registerAddress({
      data,
      userId: session?.user.id ?? "",
      editingAddressId: editingAddress?.id ?? "",
    });

    if (res.success) {
      toast("Your address is successfully saved");
      form.reset();
      setrealTimeAddressStatus(true);
      setAccordionValue(undefined); // close after save
      clearAddressForm();
    } else {
      toast("Something is wrong, please try later");
    }
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: "India" }),
        }
      );

      const { data } = await res.json();
      setAllState(data?.states);
    })();
  }, []);

  return (
    <Accordion
      className="border bg-stone-100 rounded-xs px-3"
      type="single"
      collapsible
      value={accordionValue} // ✅ controlled
      onValueChange={setAccordionValue} // ✅ sync open/close
    >
      <AccordionItem value={`item-1`}>
        <AccordionTrigger className="justify-start cursor-pointer text-blue-700 hover:no-underline flex items-center gap-x-2">
          <PlusIcon size={18} className="font-bold" />
          <h2 className=" font-semibold">ADD NEW ADDRESS</h2>
        </AccordionTrigger>
        <AccordionContent className="max-w-[800px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 p-1 space-x-4 space-y-4 "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          "rounded-xs border-none shadow-sm focus-visible:ring-1 px-3 bg-white col-span-1 h-11"
                        )}
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xs border-none shadow-sm focus-visible:ring-1 bg-white px-3 col-span-1 h-11"
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xs border-none shadow-sm focus-visible:ring-1 bg-white px-3 col-span-1 h-11"
                        placeholder="Pincode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xs border-none shadow-sm focus-visible:ring-1 bg-white px-3 col-span-1 h-11"
                        placeholder="Locality"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Write your full address"
                          className="resize-none border-none shadow-sm focus-visible:ring-1 bg-white rounded-xs h-[100px] col-span-2 flex"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xs border-none shadow-sm focus-visible:ring-1 bg-white px-3 col-span-1 h-11"
                        placeholder="City/Ditrict/Town"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-h-11 border-none shadow-sm focus-visible:ring-1 bg-white rounded-xs w-full">
                          <SelectValue placeholder="Select Your State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="col-span-1">
                        {allState?.map((state, i) => (
                          <SelectItem key={i} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xs border-none shadow-sm focus-visible:ring-1 bg-white px-3 col-span-1 h-11"
                        placeholder="Landmark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alternate_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xs bg-white border-none shadow-sm focus-visible:ring-1 px-3 col-span-1 h-11"
                        placeholder="alternate phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 flex gap-x-4">
                <Button
                  className=" rounded-xs cursor-pointer w-fit"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  onClick={clearAddressForm}
                  className=" rounded-xs cursor-pointer w-fit"
                  type="button"
                  variant={"outline"}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddNewAddress;
