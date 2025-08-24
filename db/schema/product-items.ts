import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  numeric,
} from "drizzle-orm/pg-core";


export const productItems = pgTable("product_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: text("category"),
  CatType: text("category_type"),
  SubCatType: text("sub_category_type"),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  sizes: text("sizes").array(),
  material: text("material"),
  image: text("image"),
  modalImage: text("modal_image").array(), // ✅ Postgres text[]
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});