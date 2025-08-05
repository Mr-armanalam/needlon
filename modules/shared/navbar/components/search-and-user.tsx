"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { ModeToggle } from "./theme-toggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserSection from "../user-ui/user-section";

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
      {session?.user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar
              // onClick={() => signOut()}
              className="rounded-full cursor-pointer w-[37px] h-[37px]"
            >
              <AvatarImage
                src={
                  session?.user.image ||
                  "https://avatars.githubusercontent.com/u/12345678?v=4"
                }
                alt="User Avatar"
              />
              <AvatarFallback className="bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full" />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mr-6 w-fit">
            <UserSection signOut={signOut} />
          </PopoverContent>
        </Popover>
      ) : (
        <Avatar
          onClick={() => signIn()}
          className="rounded-full cursor-pointer w-[38px] h-[38px]"
        >
          <AvatarFallback className="bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full">
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default SearchAndUser;
