import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../components/AboutPage";
import Teams from "../components/Teams";
import BufferedReadersPage from "../components/BufferedReadersPage";
import ByteStreamPage from "../components/ByteStreamPage";
import PdfViewer from "../components/FlipBook";
export const Routes = createBrowserRouter([
    {
        path: "/", element: <HomePage />
    },
    {
        path: "/about", element: <AboutPage />
    },
    {
        path: "/teams", element: <Teams />
    },
    {
        path: "/buffered-readers", element: <BufferedReadersPage />
    },
    {
        path: "/bytestreams", element: <ByteStreamPage />
    },
    {
        path: "/pdf-viewer", element: <PdfViewer />
    }
])