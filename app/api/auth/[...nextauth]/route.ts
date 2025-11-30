import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-option/auth-data";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
