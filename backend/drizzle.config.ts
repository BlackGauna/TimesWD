import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./db/schema/*",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    ssl: false,
  },
})
