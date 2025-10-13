import React, { useCallback, useEffect, useState } from "react";
import CartItems from "../components/cart-items";
import { ChooseAddress } from "../components/choose-address";
import { CartItem } from "@/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Address, fetchAddresses } from "@/features/address-slice";
import { useSession } from "next-auth/react";

type props = {
  cart: CartItem[];
};

const CartProduct = ({ cart }: props) => {
  const [currentAddress, setCurrentAddress] = useState<Address>();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const userId = session?.user.id ?? "";
  const { addresses, loading } = useAppSelector((state) => state.addresses);
  const [addressChanged, setAddressChanged] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchAddresses(userId ?? ""));
  }, [dispatch, userId, addressChanged]);

  useEffect(() => {
    if (!addresses || addresses.length === 0) return;

    setCurrentAddress(() => {
      const localAddress = localStorage.getItem("current-addr");
      if (localAddress) {
        const found = addresses.find(
          (item: Address) => item.id === localAddress
        );
        if (found) return found;
      }
      return addresses.at(-1);
    });
  }, [addresses]);

  return (
    <section>
      <h1 className="py-4 font-garamond px-4 font-semibold text-lg text-gray-900 bg-white">
        Shopping Carts
      </h1>
      <div className="flex justify-between items-center border-y py-4 mb-2 border-stone-200 bg-white px-4">
        <div className=" flex-1">
          <div className="mb-1 text-gray-950 flex gap-x-4 items-center">
            <p className="text-sm font-bold">Delivery To : </p>
            <p className="font-semibold text-sm line-clamp-1  ">
              {currentAddress?.name} {currentAddress?.pincode}
            </p>{" "}
          </div>

          <p className=" text-sm line-clamp-1 text-stone-500 ">
            {currentAddress?.address}, {currentAddress?.phone},{" "}
            {currentAddress?.landmark}, {currentAddress?.locality}{" "}
          </p>
        </div>
        <ChooseAddress
          addresses={addresses}
          currentAddress={currentAddress?.address}
          setAddressChanged = {setAddressChanged}
        />
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
