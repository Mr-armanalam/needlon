"use server";
import { db } from "@/db";
import { userAddress } from "@/db/schema/user-address";
import { and, eq } from "drizzle-orm";
import z, { success } from "zod";
import { FormSchema } from "../ui/add-new-address";

export const getAllUserAddress = async (userId: string) => {
  try {
    if (!userId) {
      return { success: false, addresses: [], message: "User ID is required" };
    }

    const addresses = await db
      .select()
      .from(userAddress)
      .where(eq(userAddress.userId, userId));

    return { success: true, addresses };
  } catch (error) {
    console.error("DB Error in getAllUserAddress:", error);
    return {
      success: false,
      addresses: [],
      message: "Failed to fetch user addresses",
    };
  }
};

type props = {
  data: z.infer<typeof FormSchema>;
  userId: string;
  editingAddressId: string;
};

export const registerAddress = async ({
  data,
  userId,
  editingAddressId,
}: props) => {
  try {
    if (!userId) return { success: false };

    if (editingAddressId) {
      await db.update(userAddress).set({
        ...data,
      }).where(and(
        eq(userAddress.userId, userId),
        eq(userAddress.id, editingAddressId)
      ))
    } else {
      await db.insert(userAddress).values({
        ...data,
        userId,
      });
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

type deleteEditeProps = {
  id: string;
  userId: string;
};

export const deleteAddress = async ({ id, userId }: deleteEditeProps) => {
  try {
    if (!userId) return;

    await db.delete(userAddress).where(eq(userAddress.id, id));

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
export const editeAddress = async ({ id, userId }: deleteEditeProps) => {
  try {
    if (!userId) return;

    await db.update(userAddress).set({}).where(eq(userAddress.id, id));

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
