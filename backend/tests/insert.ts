import { userTable } from "@schema/user"
import { db } from "../db/db"

const insertTestUser = async () => {
  const testUser = {
    username: "test",
    password: "$2b$10$x5iDW76SA22f1tSsWn030.WkfxywQ.9ehkkUpJz54Sea3zYvxf1/C",
    firstName: "Tester",
    lastName: "Testmann",
  }

  try {
    const dbUser = await db
      .insert(userTable)
      .values(testUser)
      .onConflictDoUpdate({ target: userTable.id, set: { ...testUser } })
      .returning()

    console.log("Inserted test user into db:", dbUser[0])
  } catch (error) {
    throw new Error("Could not insert test user into db")
  }
}

await insertTestUser()
