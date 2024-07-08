import Elysia from "elysia"

const workTimeRoutes = new Elysia()
  .get("/", () => "get times route")
  .post("/", () => "put times route")

export default workTimeRoutes
