"use client";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/features/cart-slice";
import React from "react";

const PriceDetails = ({ cart }: { cart: CartItem[] }) => {
  const price = Math.round(
    cart.reduce((totalPrice, item) => totalPrice + Number(item.price), 0)
  );
  const discount = Math.round(price - price * 0.4);
  const coupen = 100;
  // TODO: add discount and coupen to the item database

  console.log(cart);

  const handlePayment = async () => {

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json", // Indicate that the body contains JSON data
        },
        body: JSON.stringify({ cartItems: cart }),
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h1 className="px-4 py-4 text-md text-stone-500 font-semibold font-garamond border-b">
        PRICE DETAILS
      </h1>
      <div className="mx-4">
        <table className="w-full border-separate border-spacing-y-4 text-stone-600 font-roboto-sans">
          <tbody className="">
            <tr className="my-3">
              <td>Price ({cart.length ?? 0} item)</td>
              <td className="text-right">₹ {price}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right text-green-600">- ₹{discount}</td>
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
              <td className="text-right text-green-600">- ₹{coupen}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex px-4 py-5 border-y border-dashed justify-between font-bold text-lg text-gray-800">
        <span>Total Amount</span>
        <span>₹{price - discount - coupen}</span>
      </div>

      <div className="mx-4">
        <p className="text-green-600 text-sm font-semibold my-4">
          You will save ₹{discount + coupen} on this order
        </p>
        <Button
          onClick={handlePayment}
          type="button"
          className="h-11 cursor-pointer w-full mb-6 flex-1"
        >
          Proceed to Buy
        </Button>
      </div>
    </section>
  );
};

export default PriceDetails;
