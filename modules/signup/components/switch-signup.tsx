import React from "react";

const SwitchSignup = ({isSignUp, setIsSignUp}:{isSignUp:boolean, setIsSignUp:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className="font-garamond">
      <h1 className="text-6xl mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <span
        onClick={() => setIsSignUp(!isSignUp)}
        className=" text-muted-foreground text-md max-sm:hidden cursor-pointer hover:underline hover:decoration-dashed underline-offset-2 hover:text-gray-500 "
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </span>
    </div>
  );
};

export default SwitchSignup;
