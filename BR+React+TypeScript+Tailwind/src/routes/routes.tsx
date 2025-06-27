import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
export const Routes = createBrowserRouter([
    {
        path: "/", element: <HomePage />
    }
])