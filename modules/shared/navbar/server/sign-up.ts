/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { bcryptCompare } from "@/lib/bcrypt";
import { and, eq } from "drizzle-orm";

export const getSignUp = async ({
  firstname,
  lastname,
  email,
  password,
}: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    console.log("email and password are required");
    return;
  }
  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser) {
      console.log("User already exists");
      throw new Error("User already exists");
    }

    const [user] = await db
      .insert(usersTable)
      .values({
        name: `${firstname} ${lastname}`,
        email,
        password,
      })
      .returning();
    if (!user) return;

    return { message: "ok", status: 200 };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const isRegistered = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    console.log("email and password are required");
    return;
  }
  try {
    // const validemail = bcryptCompare(email,)
    const [user] = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      throw new Error("User not found, please Sign Up first!");
    }

    const [validUser] = await db
      .select({ email: usersTable.email, password: usersTable.password })
      .from(usersTable)
      .where(
        and(eq(usersTable.email, email), eq(usersTable.password, password))
      );

    if (!validUser) {
      throw new Error("Email or Password is not correct");
    }

    return;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
