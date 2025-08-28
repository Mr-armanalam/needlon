import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "./users";
import { productItems } from "./product-items";

export const clothesStatusEnum = pgEnum("clothes_status", [
  "received",
  "cut",
  "stitching",
  "ready",
]);


export const wishListItems = pgTable("wishlist_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => productItems.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  size: text("size"),
  status: clothesStatusEnum("status").notNull().default("received"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wishListItemsRelation = relations(wishListItems, ({ one }) => ({
  user: one(usersTable, {
    fields: [wishListItems.userId],
    references: [usersTable.id],
  }),
  product: one(productItems, {
    fields: [wishListItems.productId],
    references: [productItems.id],
  }),
}));
