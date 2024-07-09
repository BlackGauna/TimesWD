import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core"
import { userTable } from "./user"
import { relations } from "drizzle-orm"
import { createSelectSchema } from "drizzle-typebox"
import { type Static } from "elysia"

export const workTimeTable = pgTable("work_time", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  startedAt: timestamp("started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
})

export const workTimeRelations = relations(workTimeTable, ({ one }) => ({
  user: one(userTable, {
    fields: [workTimeTable.userId],
    references: [userTable.id],
  }),
}))

const workTimeSchema = createSelectSchema(workTimeTable)

export type WorkTimeSchema = Static<typeof workTimeSchema>
