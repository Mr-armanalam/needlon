import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { relations } from "drizzle-orm";
import { productItems } from "./product-items";
import { userAddress } from "./user-address";

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id")
    .references(() => productItems.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(),
  shipping_charge: integer("shipping_charge").default(40),
  pod_charge: integer("pod_charge").default(7),
  shipping_address: uuid('shipping_address').references(() => userAddress.id, {onDelete: 'cascade'}).notNull(),
  invoice: text('invoice'),
  properties: text("order_properties"),
  delivery_date: timestamp("delivery_date"),
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
  address: one(userAddress, {
    fields: [orderItems.shipping_address],
    references: [userAddress.id],
  })
}));
