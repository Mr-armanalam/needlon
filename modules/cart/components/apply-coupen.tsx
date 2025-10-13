'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { validateCoupon } from "@/lib/validate-coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  coupon_code: z.string().min(2, {
    message: "Coupon code must be at least 2 characters.",
  }),
});

const ApplyCoupon = ({
  setCouponDiscount,
}: {
  setCouponDiscount: (data: number) => void;
}) => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coupon_code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await validateCoupon({
      code: values.coupon_code,
      userId: session?.user.id ?? "",
    });

    if (!result.valid) {
      form.setError("coupon_code", { message: result.message });
      return;
    }

    if (result?.coupon && typeof result.coupon.maxUses === "number" && result.coupon.maxUses <= 2) {
      setCouponDiscount(result.coupon.value);
    }
  }

  return (
    <Form {...form}>
      <form className="mb-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="coupon_code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGroup className="border border-x-0 focus-visible:ring-0 rounded-none shadow-none border-dashed h-16">
                  <InputGroupInput
                    className="border px-5 text-stone-800 font-bold border-none"
                    placeholder="Coupon code"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="submit"
                      className="h-full text-stone-900 font-bold px-3"
                    >
                      Apply
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ApplyCoupon;
