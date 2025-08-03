// app/auth/error/page.tsx or pages/auth/error.tsx
"use client"; // if using app router
import { useSearchParams } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="text-red-500">
      {error === "User already exists"
        ? "This email is already registered. Please sign in."
        : "An error occurred during sign in."}
    </div>
  );
}
