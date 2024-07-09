import Elysia, { t } from "elysia"
import { db } from "../db/db"
import { workTimeTable } from "@schema/worktime"
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

const workTimeRoutes = new Elysia()
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
        sessionId: t.Number(),
        endDate: t.Date(),
      }),
    }
  )

export default workTimeRoutes
