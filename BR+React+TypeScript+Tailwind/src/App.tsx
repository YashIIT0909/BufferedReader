import { RouterProvider } from "react-router-dom"
import { Routes } from "../src/routes/routes"
function App() {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  )
}

export default App
