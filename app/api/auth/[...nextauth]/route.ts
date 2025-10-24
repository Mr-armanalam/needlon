
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-option/auth-data";

const handler = NextAuth(
  authOptions
  // {
  // providers: [
  //   CredentialsProvider({
  //     name: "Credentials",
  //     credentials: {
  //       email: { label: "Email", type: "text" },
  //       password: { label: "Password", type: "password" },
  //     },
  //     authorize: async (credentials) => {
  //       try {
  //         if (credentials) {
  //           const [user] = await db
  //             .select()
  //             .from(usersTable)
  //             .where(
  //               and(
  //                 eq(usersTable.email, credentials.email),
  //                 eq(usersTable.password, credentials.password)
  //               )
  //             );
  //           if (user) {
  //             return {
  //               id: user.id,
  //               email: user.email,
  //               name: user?.name,
  //               image: user?.imageUrl || "",
  //             };
  //           }
  //           return null;
  //         }
  //         return null;
  //       } catch (error: any) {
  //         console.log(error.message);
  //         return null;
  //       }
  //     },
  //   }),
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  //   }),
  //   FacebookProvider({
  //     clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
  //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
  //   }),
  // ],
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  // },
  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (!user.email) {
  //       throw new DrizzleError({
  //         message: "User email is undefined",
  //         cause: "User email is required for sign-in",
  //       });
  //     }
  //     const [existingUser] = await db
  //       .select()
  //       .from(usersTable)
  //       .where(eq(usersTable?.email, user.email));

  //     if (!existingUser) {
  //       const [newUser] = await db
  //         .insert(usersTable)
  //         .values({
  //           name: user.name || "",
  //           email: user.email,
  //           imageUrl: user.image,
  //         })
  //         .returning();

  //       user.id = newUser.id.toString();
  //     } else {
  //       user.id = existingUser.id.toString();
  //     }
  //     return true;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.name = user?.name;
  //       token.image = user?.image;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token && session.user) {
  //       session.user.id = token.id as string;
  //       session.user.email = token.email as string;
  //       session.user.name = token?.name as string;
  //       session.user.image = token?.image as string;
  //     }
  //     return session;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     if (url.startsWith("/")) return `${baseUrl}${url}`;
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   },
  // },
// }
);

export { handler as GET, handler as POST };
