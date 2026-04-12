import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthFormReturn } from "@/types/auth-form";
import React from "react";

const EmailOtpPassword = ({ isOtp, form }: { isOtp: boolean; form: AuthFormReturn }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <Input
                className="text-xs focus-visible:ring-0 border focus-visible:border-gray-300 focus-visible:outline-none"
                type="email"
                disabled={isOtp}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isOtp ? (
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                One-Time Password <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <InputOTP autoComplete="one-time-code" {...field} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xs focus-visible:ring-0 border focus-visible:border-gray-300 focus-visible:outline-none"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default EmailOtpPassword;
