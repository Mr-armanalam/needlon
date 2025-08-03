/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getSignUp,
  isRegistered,
} from "@/modules/shared/navbar/server/sign-up";
import { MoveRight } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const signupSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .optional(),
  lastname: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .optional(),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Please enter a strong password.",
  }),
});

const signInSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Please enter a strong password.",
  }),
});

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const schema = useMemo(
    () => (isSignUp ? signupSchema : signInSchema),
    [isSignUp]
  );

  const defaultValues = useMemo(
    () =>
      isSignUp
        ? {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
          },
    [isSignUp]
  );

  type SchemaType = typeof signupSchema | typeof signInSchema;
  type FormValues = z.infer<SchemaType>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema as SchemaType),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [isSignUp, defaultValues, form]);

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    const { email, password } = data;

    try {
      if (email && password) {
        await isRegistered({
          email,
          password,
        }).catch(() => {
          form.setError("email", {
            type: "manual",
            message: "Email or password is not correct.",
          });
          return;
        });
        await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        })
          .then((result) => {
            if (result?.error === null) {
              toast.success("Sign In successful, redirecting...");
              setTimeout(() => {
                router.push("/");
              }, 1000);
            }else {
              console.log("Sign In Error:", result);
              form.setError("email", {
                type: "manual",
                message: "Email or password is not correct.",
              });
            }
          })
          .catch((error) => {
            console.error("Sign Up Error:", error);
            form.setError("email", {
              type: "manual",
              message: "An error occurred during sign up.",
            });
          });
      }
    } catch (error: any) {
      console.log("Error during sign in:", error);
    }
  };

  const handleSignUp = async (data: z.infer<typeof signupSchema>) => {
    const { firstname, lastname, email, password } = data;
    if (email && password) {
      const result = await getSignUp({
        firstname: firstname ?? "",
        lastname: lastname ?? "",
        email,
        password,
      });
      if (result?.message === "ok") {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
          redirect: false,
        });
        toast.success("Sign Up successful, redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        console.log("something is wrong");
        form.setError("email", {
          type: "manual",
          message: result?.message || "Email is already registered.",
        });
      }
    }
  };

  return (
    <div className=" flex justify-center items-center h-[80vh] max-md:px-4 md:px-12 ">
      <div className="grid border shadow-inne shadow-[12px_12px_35px_rgba(0,0,0,0.25)] h-fit w-full grid-cols-2 rounded-3xl bg-white max-sm:grid-cols-1 max-sm:p-10 sm:p-16 lg:w-[72vw]">
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
        <div>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(
                isSignUp ? handleSignUp : handleSignIn
              )}
            >
              {isSignUp && (
                <div className="flex gap-x-3 justify-between">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          First Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className=" text-xs focus-visible:ring-0 focus-visible:border-gray-300 focus-visible:outline-none"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Last Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className=" text-xs focus-visible:ring-0 focus-visible:border-gray-300 focus-visible:outline-none"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs focus-visible:ring-0 border focus-visible:border-gray-300 focus-visible:outline-none"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs focus-visible:ring-0 border focus-visible:border-gray-300 focus-visible:outline-none"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className=" mt-3 cursor-pointer flex bg-gray-800 px-6 py-2 font-bold text-white"
                type="submit"
              >
                {isSignUp ? "Sign Up" : "Sign In"}{" "}
                <MoveRight className="size-4 mt-1" />
              </Button>
              {!isSignUp && (
                <label className="text-center font-bold text-gray-600">
                  OR
                </label>
              )}
            </form>
          </Form>
          {!isSignUp && (
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
          )}
          {/* extra for responsive */}
          <p
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-2  max-sm:pl-10 sm:hidden"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { getSignUp } from "@/modules/shared/navbar/server/sign-up";
// import { MoveRight, PopcornIcon, Terminal } from "lucide-react";
// import { signIn } from "next-auth/react";
// import React, { useEffect, useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaFacebook, FaGoogle } from "react-icons/fa";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { redirect } from "next/dist/server/api-utils";
// import { useRouter } from "next/navigation";

// const signupSchema = z.object({
//   firstname: z
//     .string()
//     .min(2, {
//       message: "First Name must be at least 2 characters.",
//     })
//     .optional(),
//   lastname: z
//     .string()
//     .min(2, {
//       message: "Last Name must be at least 2 characters.",
//     })
//     .optional(),
//   email: z.email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(2, {
//     message: "Please enter a strong password.",
//   }),
// });

// const signInSchema = z.object({
//   email: z.email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(2, {
//     message: "Please enter a strong password.",
//   }),
// });

// const SignIn = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [status, setStatus] = useState<"error" | "success">("error");
//   const router = useRouter();

//   const schema = useMemo(
//     () => (isSignUp ? signupSchema : signInSchema),
//     [isSignUp]
//   );

//   const defaultValues = useMemo(
//     () =>
//       isSignUp
//         ? {
//             firstname: "",
//             lastname: "",
//             email: "",
//             password: "",
//           }
//         : {
//             email: "",
//             password: "",
//           },
//     [isSignUp]
//   );

//   type FormValues = z.infer<typeof signupSchema> & z.infer<typeof signInSchema>;
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues,
//   });

//   useEffect(() => {
//     form.reset(defaultValues);
//   }, [isSignUp, defaultValues, form]);

//   const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
//     const { email, password } = data;
//     console.log(data);

//     try {
//       if (email && password) {
//         await signIn("credentials", {
//           email,
//           password,
//           callbackUrl: "/",
//           redirect: false,
//         })
//           .then((result) => {
//             if (result?.ok) {
//               setStatus("success");
//               toast.success("Sign Up successful, redirecting...");
//               setTimeout(() => {
//                 router.push("/");
//               }, 1000);
//             }
//             if (result?.error) {
//               console.log("Sign Up Error:", result);
//               form.setError("email", {
//                 type: "manual",
//                 message: "Email or password is not correct.",
//               });
//             }
//           })
//           .catch((error) => {
//             console.error("Sign Up Error:", error);
//             form.setError("email", {
//               type: "manual",
//               message: "An error occurred during sign up.",
//             });
//           });
//       }
//     } catch (error: any) {
//       console.log("Error during sign in:", error);
//     }
//   };

//   const handleSignUp = async (data: z.infer<typeof signupSchema>) => {
//     const { firstname, lastname, email, password } = data;
//     if (email && password) {
//       const result = await getSignUp({
//         firstname: firstname ?? "",
//         lastname: lastname ?? "",
//         email,
//         password,
//       });
//       if (result?.message === "ok") {
//         await signIn("credentials", {
//           email,
//           password,
//           callbackUrl: "/",
//         })
//           .then((result) => {
//             if (result?.ok) {
//               setStatus("success");
//               toast.success("Sign Up successful, redirecting...");
//               setTimeout(() => {
//                 router.push("/");
//               }, 1000);
//             }
//             if (result?.error) {
//               console.log("Sign Up Error:", result);
//               form.setError("email", {
//                 type: "manual",
//                 message: "Email is already registered.",
//               });
//             }
//           })
//           .catch((error) => {
//             console.error("Sign Up Error:", error);
//             form.setError("email", {
//               type: "manual",
//               message: "An error occurred during sign up.",
//             });
//           });
//       } else {
//         console.log("something is wrong");
//       }
//     }
//   };

//   return (
//     <div className=" flex justify-center items-center h-[80vh] max-md:px-4 md:px-12 ">
//       <div className="grid border shadow-inne shadow-[12px_12px_35px_rgba(0,0,0,0.25)] h-fit w-full grid-cols-2 rounded-3xl bg-white max-sm:grid-cols-1 max-sm:p-10 sm:p-16 lg:w-[72vw]">
//         <div className="font-garamond">
//           <h1 className="text-6xl mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h1>
//           <span
//             onClick={() => setIsSignUp(!isSignUp)}
//             className=" text-muted-foreground text-md max-sm:hidden cursor-pointer hover:underline hover:decoration-dashed underline-offset-2 hover:text-gray-500 "
//           >
//             {isSignUp
//               ? "Already have an account? Sign In"
//               : "Don't have an account? Sign Up"}
//           </span>
//         </div>
//         <div>
//           <Form {...form}>
//             <form
//               className="flex flex-col gap-2"
//               onSubmit={form.handleSubmit(
//                 isSignUp ? handleSignUp : handleSignIn
//               )}
//             >
//               {isSignUp && (
//                 <div className="flex gap-x-3 justify-between">
//                   <FormField
//                     control={form.control}
//                     name="firstname"
//                     render={({ field }) => (
//                       <FormItem className="flex-1">
//                         <FormLabel>
//                           First Name <span className="text-red-600">*</span>
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className=" text-xs focus-visible:ring-0 focus-visible:border-gray-300 focus-visible:outline-none"
//                             type="text"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastname"
//                     render={({ field }) => (
//                       <FormItem className="flex-1">
//                         <FormLabel>
//                           Last Name <span className="text-red-600">*</span>
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className=" text-xs focus-visible:ring-0 focus-visible:border-gray-300 focus-visible:outline-none"
//                             type="text"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               )}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Email <span className="text-red-600">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="text-xs focus-visible:ring-0 border focus-visible:border-gray-300 focus-visible:outline-none"
//                         type="email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Password <span className="text-red-600">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="text-xs focus-visible:ring-0 border focus-visible:border-gray-300 focus-visible:outline-none"
//                         type="text"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 className=" mt-3 cursor-pointer flex bg-gray-800 px-6 py-2 font-bold text-white"
//                 type="submit"
//               >
//                 {isSignUp ? "Sign Up" : "Sign In"}{" "}
//                 <MoveRight className="size-4 mt-1" />
//               </Button>
//               {!isSignUp && (
//                 <label className="text-center font-bold text-gray-600">
//                   OR
//                 </label>
//               )}
//             </form>
//           </Form>
//           {!isSignUp && (
//             <div className="flex mt-3 text-gray-800 justify-between">
//               <Button
//                 variant={"outline"}
//                 className="hover:bg-transparent cursor-pointer"
//                 onClick={() => signIn("google", { callbackUrl: "/" })}
//               >
//                 <FaGoogle className="w-4 h-4" />
//                 Sign In with Google
//               </Button>
//               <Button
//                 variant={"outline"}
//                 className="hover:bg-transparent cursor-pointer"
//                 onClick={() => signIn("facebook", { callbackUrl: "/" })}
//               >
//                 <FaFacebook className="w-4 h-4 " />
//                 Sign In with Facebook
//               </Button>
//             </div>
//           )}
//           {/* extra for responsive */}
//           <p
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="mt-2  max-sm:pl-10 sm:hidden"
//           >
//             {isSignUp
//               ? "Already have an account? Sign In"
//               : "Don't have an account? Sign Up"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
