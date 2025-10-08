import React from "react";
import CartItems from "../components/cart-items";
import { ChooseAddress } from "../components/choose-address";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/components/ui/button";
import { increment } from "@/features/counterSlice";
import { CartItem } from "@/features/cart-slice";

type props = {
  cart: CartItem[];
};

const CartProduct = ({ cart }: props) => {
   const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  return (
    <section>
      <h1 className="py-4 font-garamond px-4 font-semibold text-lg text-gray-900 bg-white">
        Shopping Carts
      </h1>
      <div className="flex justify-between items-center border-y py-4 mb-2 border-stone-200 bg-white px-4">
        <div>
            <Button onClick={() => dispatch(increment())}>add</Button>
          <h1 className=" text-sm line-clamp-1 text-gray-900 ">Delivery To : {count}</h1>
        </div>
        <ChooseAddress />
      </div>
      <div className="bg-white">
        {cart.map((item, i) => (
          <CartItems
            key={i}
            name={item.name}
            productId={item.productId}
            image={item.image}
            size={item.size}
            price={item.price}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
    </section>
  );
};

export default CartProduct;
