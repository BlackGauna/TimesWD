import Elysia, { t } from "elysia"
import { db } from "../db/db"
import { workTimeTable, type WorkTimeSchema } from "@schema/worktime"
import { eq } from "drizzle-orm"

const putStartDate = async (userId: number, startDate: Date) => {
  const res = (
    await db
      .insert(workTimeTable)
      .values({
        userId: userId,
        startedAt: startDate,
      })
      .returning({ sessionId: workTimeTable.id })
  )[0].sessionId

  return res as number
}

const putEndDate = async (sessionId: number, endDate: Date) => {
  const res = (
    await db
      .update(workTimeTable)
      .set({
        endedAt: endDate,
      })
      .where(eq(workTimeTable.id, sessionId))
      .returning({ endedAt: workTimeTable.endedAt })
  )[0].endedAt

  return res as Date
}

const getUserSessions = async (userId: number) => {
  const sessions = await db.query.workTimeTable.findMany({
    where: eq(workTimeTable.userId, userId),
  })

  return [sessions] as WorkTimeSchema[][]
}

const workTimeRoutes = new Elysia()
  .get("/sessions/:userId", async ({ params: { userId } }) =>
    getUserSessions(parseInt(userId))
  )
  .post(
    "/startsession",
    async ({ body }) => putStartDate(body.userId, body.startDate),
    {
      body: t.Object({
        userId: t.Number(),
        startDate: t.Date(),
      }),
    }
  )
  .post(
    "/endsession",
    async ({ body }) => putEndDate(body.sessionId, body.endDate),
    {
      body: t.Object({
        sessionId: t.Numeric(),
        endDate: t.Date(),
      }),
    }
  )

export default workTimeRoutes
