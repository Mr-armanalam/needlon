import {
  pgTable,
  uuid,
  integer,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { orderItems } from "./order-items";

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => usersTable.id, {onDelete: 'cascade'}).notNull(),
  total: integer("total").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("INR"),
  paymentMode: varchar('paymentMode'),
  status: varchar("status", { length: 20 }).notNull().default("PENDING"),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});


export const ordersRelation = relations(orders, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [orders.userId],
    references: [usersTable.id],
  }),
  orderItems: many(orderItems),
}));