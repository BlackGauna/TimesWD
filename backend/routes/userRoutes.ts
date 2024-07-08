import Elysia from "elysia"

const userRoutes = new Elysia().get("/login", () => "login route")

export default userRoutes
