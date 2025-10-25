import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { relations } from "drizzle-orm";
import { productItems } from "./product-items";


export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, {onDelete: 'cascade'}).notNull(),
  productId: uuid("product_id").references(() => productItems.id).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(),
  properties: text('order_properties'),
  delivery_date: timestamp('delivery_date'),
});


export const orderItemsRelation = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(productItems, {
    fields: [orderItems.productId],
    references: [productItems.id],
  }),

}));
