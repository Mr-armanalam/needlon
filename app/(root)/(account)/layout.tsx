import { ScrollArea } from "@/components/ui/scroll-area";
import AccountNav from "@/modules/account/shared/account-nav";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen bg-zinc-100 flex gap-4 pl-8 py-2 pr-12 flex-1">
      <div className="flex-[25%] h-a">
        <AccountNav />
      </div>
      <ScrollArea className="flex-[75%] shadow-sm shadow-stone-100 rounded-xs bg-white">
        {children}
      </ScrollArea>
    </div>
  );
};

export default layout;
