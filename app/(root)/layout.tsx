"use client";
import { CartProvider } from "@/hooks/cart-context";
import { WishlistProvider } from "@/hooks/wishlist-context";
import FooterSection from "@/modules/shared/footer/footer-section";
import NavbarSection from "@/modules/shared/navbar/navbar-section";
import { useSession } from "next-auth/react";
// import { Metadata } from "next";
import React from "react";

// export const metadata: Metadata = {
//   title: "Needlon",
//   description: "A fashionable clothing tailoring service",
// };

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <CartProvider userId={session?.user.id}>
      <WishlistProvider userId={session?.user.id}>
        <NavbarSection />
        <div className="flex flex-col min-h-screen flex-1">{children}</div>
        <FooterSection />
      </WishlistProvider>
    </CartProvider>
  );
};

export default Layout;
