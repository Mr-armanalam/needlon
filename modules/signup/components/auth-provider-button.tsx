import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const AuthProviderButton = () => {
  return (
    <div className="flex mt-3 text-gray-800 justify-between">
      <Button
        variant={"outline"}
        className="hover:bg-transparent cursor-pointer"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <FaGoogle className="w-4 h-4" />
        Sign In with Google
      </Button>
      <Button
        variant={"outline"}
        className="hover:bg-transparent cursor-pointer"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
      >
        <FaFacebook className="w-4 h-4 " />
        Sign In with Facebook
      </Button>
    </div>
  );
};

export default AuthProviderButton;
