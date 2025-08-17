import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 🟢 Users Table
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 🟢 Cart Items Table
export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  size: text("size"),
  image: text("image"),
  modalImage: text("modal_image").array(), // ✅ Postgres text[]
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 🟢 Wishlist Items Table
export const wishlistItems = pgTable("wishlist_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  size: text("size"),
  image: text("image"),
  modalImage: text("modal_image").array(), // ✅ Postgres text[]
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 🟢 Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(usersTable, {
    fields: [cartItems.userId],
    references: [usersTable.id],
  }),
}));

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  user: one(usersTable, {
    fields: [wishlistItems.userId],
    references: [usersTable.id],
  }),
}));
