import Elysia, { t } from "elysia"
import bcrypt from "bcrypt"
import { db } from "../db/db"
import { eq } from "drizzle-orm"
import { userTable, type UserIdandPW } from "@schema/user"

const salt = 10

const getUserwithPW = async (username: string, password: string) => {
  // const pw = "qwer"

  // const test = await bcrypt.hash(pw, salt)
  // console.log("testPW", test)
  let user: UserIdandPW

  user = (await db.query.userTable.findFirst({
    where: eq(userTable.username, username),
    columns: {
      id: true,
      password: true,
    },
  }))!

  if (user === undefined) throw new Error("Username not found").message

  const userpw = user?.password
  console.log("userpw", userpw)
  const match = await bcrypt.compare(password, user?.password!)
  console.log("match", match)

  if (!match) return -1 as number

  return user?.id! as number
}

const userRoutes = new Elysia().get(
  "/login/:username/:password",
  async ({ params: { username, password } }) =>
    getUserwithPW(username, password),
  {
    params: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  }
)

export default userRoutes
