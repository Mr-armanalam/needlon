import { authOptions } from "@/lib/auth-option/auth-data"
import NextAuth from "next-auth"
 
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)