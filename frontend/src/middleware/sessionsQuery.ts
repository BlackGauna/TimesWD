import { treaty } from "@elysiajs/eden"
import { App } from "../../../backend/server"
import { useQuery } from "@tanstack/react-query"

const client = treaty<App>("localhost:3000")

export const useSessions = (userId: string) => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => getUserSessions(userId),
    retry: false,
  })
}

const getUserSessions = async (userId: string) => {
  try {
    const res = await client.worktime.sessions({ userId: userId }).get()

    const sessions = res.data[0]
    console.log(sessions)
    return sessions
  } catch (error) {
    throw new Error("Could not get sessions data, please try again.")
  }
}
