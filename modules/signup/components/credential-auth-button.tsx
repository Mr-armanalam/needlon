import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const CredentialAuthButton = ({isSignUp}:{isSignUp:boolean}) => {
  return (
    <>
      <Button
        className=" mt-3 cursor-pointer flex bg-gray-800 px-6 py-2 font-bold text-white"
        type="submit"
      >
        {isSignUp ? "Sign Up" : "Sign In"} <MoveRight className="size-4 mt-1" />
      </Button>
      {!isSignUp && (
        <label className="text-center font-bold text-gray-600">OR</label>
      )}
    </>
  );
};

export default CredentialAuthButton;
