import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { relations } from "drizzle-orm";
import { productItems } from "./product-items";
import { productReview } from "./product-review";
import { orderStatus } from "./order-status";

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id")
    .references(() => productItems.id)
    .notNull(),
  rating: uuid('rating').references(()=> productReview.id, {onDelete: 'cascade'}),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(),
  invoice: text('invoice'),
  properties: text("order_properties"),
  delivery_date: timestamp("delivery_date"),
  order_status: uuid('order_status').references(() => orderStatus.id, {onDelete: 'cascade'})
});

export const orderItemsRelation = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(productItems, {
    fields: [orderItems.productId],
    references: [productItems.id],
  }),
  order_status: one(orderStatus, {
    fields: [orderItems.order_status],
    references: [orderStatus.id],
  }),
  rating: many(productReview)
}));
