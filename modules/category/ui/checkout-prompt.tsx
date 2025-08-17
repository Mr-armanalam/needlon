import Image from "next/image";
import React from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  modalImage?: string[] | null;
  quantity: number;
}


const CheckoutPrompt = ({
  setCart,
  setOpen,
  cart,
}: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const removeFromCart = (id: number, size: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-4 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold font-garamond">CART ITEMS - {cart.length} </h2>
        <button className="cursor-pointer" onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="mt-4 max-h-[68vh] font-garamond no-scrollbar overflow-y-auto space-y-4">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex border-y bg-stone-100 p-8 gap-3 pb-2">
            <div className="relative w-[60px] h-[100px]">
              <Image fill src={item.image} alt={item.name} className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-muted-foreground">
                ${item.price.toFixed(2)} × {item.quantity}
              </p>
              <p className="text-sm mt-2">Size: {item.size}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <button
                className="text-red-500 cursor-pointer text-xs mt-1"
                onClick={() => removeFromCart(item.id, item.size)}
              >
                Remove one
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4">
        <p className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <button className="w-full bg-black text-white py-2 mt-4">Proceed Checkout</button>
        <button className="w-full underline mt-2">Go to Shopping Cart</button>
      </div>
    </div>
  );
};

export default CheckoutPrompt;

