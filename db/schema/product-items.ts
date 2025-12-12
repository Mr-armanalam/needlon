import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";
import { orderItems } from "./order-items";
import { wishListItems } from "./wishlist-items";
import { cartItems } from "./cart-items";
import { productReview } from "./product-review";
import { productCategory } from "./product-category";

export const productItems = pgTable("product_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => productCategory.id, {onDelete: 'cascade'}),
  name: text("name").notNull(),
  tagName: text('tag_name').notNull(),
  mrp_price: numeric("mrp_price", { precision: 10, scale: 2 }).default(
    "1500.00"
  ),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  sizes: text("sizes").array(),
  material: text("material"),
  image: text("image"),
  modalImage: text("modal_image").array(),
  quantity: integer("quantity").notNull().default(1),
  averageRating: numeric("average_rating", { precision: 3, scale: 2 })
    .default("0.00")
    .notNull(),
  reviewCount: integer("review_count").default(0).notNull(),
  isPremium: boolean("is_premium").notNull().default(false),
  seasonType: text('season_type').notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productItemsRelation = relations(productItems, ({ many }) => ({
  orderItem: many(orderItems),
  wishlist: many(wishListItems),
  cartItems: many(cartItems),
  review: many(productReview),
}));
