import { password } from "bun"
import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
})
