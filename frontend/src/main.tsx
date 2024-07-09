import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Timer from "./components/Timer.tsx"
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login.tsx"
import Overview from "./components/Overview.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/timer/:userId",
    element: <Timer />,
  },
  {
    path: "/overview/:userId",
    element: <Overview />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
