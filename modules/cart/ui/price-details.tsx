import { Button } from "@/components/ui/button";
import React from "react";

const PriceDetails = () => {
  return (
    <div>
      <h1 className="px-4 py-4 text-md text-stone-500 font-semibold font-garamond border-b">
        PRICE DETAILS
      </h1>
      <div className="mx-4">
        <table className="w-full border-separate border-spacing-y-4 text-stone-600 font-roboto-sans">
          <tbody className="">
            <tr className="my-3">
              <td>Price (1 item)</td>
              <td className="text-right">₹8,499</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right text-green-600">- ₹7,300</td>
            </tr>
            <tr>
              <td className="flex items-center gap-1">
                Coupons for you{" "}
                <span
                  className="text-gray-400 cursor-pointer"
                  title="Coupon Applied"
                >
                  ⓘ
                </span>
              </td>
              <td className="text-right text-green-600">- ₹100</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex px-4 py-5 border border-dashed justify-between font-bold text-lg text-gray-800">
        <span>Total Amount</span>
        <span>₹1,118</span>
      </div>

      <div className="mx-4">
        <p className="text-green-600 text-sm font-semibold my-4">You will save ₹7,381 on this order</p>
        <Button type="button" className="h-11 cursor-pointer w-full mb-6 flex-1" >Proceed to Buy</Button>
      </div>
    </div>
  );
};

export default PriceDetails;

// Price (1 item)

// ₹8,499
// Discount
// − ₹7,300
// Coupons for you

// − ₹100
// Protect Promise Fee

// ₹19
// Total Amount
// ₹1,118
// You will save ₹7,381 on this order
