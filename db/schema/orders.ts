import {
  pgTable,
  uuid,
  integer,
  varchar,
  jsonb,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  items: jsonb("items").notNull(), // [{ productId, quantity }]
  total: integer("total").notNull(), // store in smallest currency (cents/paise)
  currency: varchar("currency", { length: 10 }).notNull().default("INR"),
  status: varchar("status", { length: 20 }).notNull().default("PENDING"), // PENDING | PAID | COD_PENDING
  paymentId: text("payment_id"), // Stripe session or null for COD
  createdAt: timestamp("created_at").defaultNow(),
});
