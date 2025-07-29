"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { ModeToggle } from "./theme-toggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, useSession } from "next-auth/react";

const SearchAndUser = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-black/10 backdrop-blur-md rounded-md flex items-center">
        <Input
          placeholder="Search"
          className="outline-none focus-visible:ring-0 rounded-full border-none "
        />
      </div>
      <ModeToggle />
      {session?.user?.image ? (
        <Avatar className="rounded-full cursor-pointer w-[35.5px] h-[35.5px]">
          <AvatarImage
            src={"https://avatars.githubusercontent.com/u/12345678?v=4"}
            alt="User Avatar"
          />
          <AvatarFallback className="bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full" />
        </Avatar>
      ) : (
        <Avatar onClick={()=> signIn("google")} className="rounded-full cursor-pointer w-[35.5px] h-[35.5px]">
          <AvatarFallback className="bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default SearchAndUser;
