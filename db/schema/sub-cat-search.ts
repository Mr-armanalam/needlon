import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const subcatSearchItem = pgTable('subcatSearch', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  image: text('image')
})