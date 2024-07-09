import Elysia from "elysia"
import { cors } from "@elysiajs/cors"
import userRoutes from "./routes/userRoutes"

const app = new Elysia()
  .use(cors())
  .get("/", () => "hi")
  .group("/user", (app) => app.use(userRoutes))
  .listen(process.env.BACKEND_PORT as string)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
