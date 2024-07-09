import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core"
import { userTable } from "./user"
import { relations } from "drizzle-orm"

export const workTimeTable = pgTable("work_time", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at").notNull(),
})

export const workTimeRelations = relations(workTimeTable, ({ one }) => ({
  user: one(userTable, {
    fields: [workTimeTable.userId],
    references: [userTable.id],
  }),
}))
