import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as userSchema from "@schema/user"
import * as workTimeSchema from "@schema/worktime"

const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
})

await client.connect()
export const db = drizzle(client, {
  schema: { ...userSchema, ...workTimeSchema },
})
