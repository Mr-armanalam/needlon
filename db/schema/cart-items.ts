import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "./users";


export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull(),
  category: text("category"),
  CatType: text("category_type"),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  size: text("size"),
  image: text("image"),
  modalImage: text("modal_image").array(), // ✅ Postgres text[]
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(usersTable, {
    fields: [cartItems.userId],
    references: [usersTable.id],
  }),
}));
