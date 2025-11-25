import { date, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum('status_type', ['active', 'upcoming', 'expired'])

export const rewardSchema = pgTable('rewards_schema', {
  id: uuid('id').primaryKey().defaultRandom(),
  coupon_code: text('coupon_code').notNull(),
  discount: text('discount').notNull(),
  discription: text('discription').notNull(),
  gradient: text('gradient_color').notNull().default('from-purple-500 to-pink-500'),
  status: statusEnum().default('upcoming'),
  validFrom: date('valide_from').defaultNow().notNull(),
  validTo: date('valide_to').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, {onDelete: 'cascade'})
})

export const rewardSchemaRelation = relations(rewardSchema, ({one}) => ({
  user: one(usersTable, {
    fields: [rewardSchema.userId],
    references: [usersTable.id]
  })
}))