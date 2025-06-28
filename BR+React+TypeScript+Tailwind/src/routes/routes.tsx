import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../components/AboutPage";
export const Routes = createBrowserRouter([
    {
        path: "/", element: <HomePage />
    },
    {
        path: "/about", element: <AboutPage />
    }
])