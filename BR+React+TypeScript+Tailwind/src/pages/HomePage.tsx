import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar.jsx";
import axios from "axios";
import logoImage2 from "/logo.png";

const BUFFERED_READERS_FOLDER_ID = "1inj0AM4qnEjLr88-7_SGGvQpuTv804rH";
const HomePage = () => {
    const navigate = useNavigate();
    const [latestPdf, setLatestPdf] = useState(null);
    const [isLoadingMagazine, setIsLoadingMagazine] = useState<boolean>(false);
    return (
        <div>

        </div>
    )
}

export default HomePage
