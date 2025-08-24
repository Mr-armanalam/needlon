import {
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "./users";

export const wishlistItems = pgTable("wishlist_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull(),
  category: text("category"),
  CatType: text("category_type"),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  sizes: text("sizes").array(),
  image: text("image"),
  modalImage: text("modal_image").array(), // ✅ Postgres text[]
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  user: one(usersTable, {
    fields: [wishlistItems.userId],
    references: [usersTable.id],
  }),
}));