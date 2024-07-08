import { relations } from "drizzle-orm"
import { pgTable, serial, text } from "drizzle-orm/pg-core"
import { workTimeTable } from "./worktime"

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
})

export const userRelations = relations(userTable, ({ many }) => ({
  workTimes: many(workTimeTable),
}))
