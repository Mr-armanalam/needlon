'use server'
import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { eq } from "drizzle-orm"

export const getPersonalinfo = async (userId: string) => {
  try {
    const [info] = await db
      .select({
        name: usersTable.name,
        email: usersTable.email,
        phone: usersTable.number,
        gender: usersTable.gender
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    return { data: info, success: true };
  } catch (error) {
    return { success: false, data: null, error };
  }
};
