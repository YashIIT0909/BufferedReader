import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import LoadingCircle from "./LoadingCircle.jsx";
import axios from "axios";
const BUFFERED_READERS_FOLDER_ID = "1nvs0pbcerRm-1pCcLOk-WJSPZ5pZnnU5"; // Replace with your actual Folder ID

const ByteStreamPage = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [showDropdown, setShowDropdown] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [pdfData, setPdfData] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isLoadingMagazine, setIsLoadingMagazine] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 115);
        window.addEventListener("scroll", handleScroll);

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 📌 Fetch Subfolders (2015-16, 2016-17)
    async function getSubfolders() {
        try {
            const url = `http://localhost:5003/subfolders?folderId=${BUFFERED_READERS_FOLDER_ID}`;
            const response = await axios.get(url);
            if (response.status !== 200) throw new Error("Failed to fetch subfolders");

            return response.data.files.sort((a: { name: string; }, b: { name: string; }) => b.name.localeCompare(a.name)); // Reverse Order
        } catch (error) {
            console.error("Error fetching subfolders:", error);
            setError("Failed to fetch subfolders.");
            return [];
        }
    }

    // 📌 Fetch PDFs from a Given Folder
    async function getPdfsFromFolder(folderId: string) {
        try {
            const url = `http://localhost:5003/pdfs?folderId=${folderId}`;
            const response = await axios.get(url);
            if (response.status !== 200)
                throw new Error(`Failed to fetch PDFs for folder ${folderId}`);

            return response.data.files;
        } catch (error) {
            console.error("Error fetching PDFs:", error);
            return [];
        }
    }

    // 📌 Fetch All PDFs Grouped by Year
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            console.log("Fetching subfolders...");

            const subfolders = await getSubfolders();
            console.log("Subfolders fetched:", subfolders);

            const pdfData: Record<string, any[]> = {};

            for (const folder of subfolders) {
                console.log(`Fetching PDFs from folder: ${folder.name} (${folder.id})`);
                const pdfs = await getPdfsFromFolder(folder.id);
                console.log(`PDFs in ${folder.name}:`, pdfs);

                if (pdfs.length > 0) {
                    pdfData[folder.name] = pdfs;
                }
            }

            console.log("Final PDF Data:", pdfData);
            setPdfData(pdfData);
            setLoading(false);
        }

        fetchData().catch((error) => {
            console.error("Error fetching data:", error);
            setError("Failed to load data.");
            setLoading(false);
        });
    }, []);

    // const filterOptions = ["ALL", ...Object.keys(pdfData)];

    const toggleCardExpansion = (year: string) => {
        setExpandedCards((prevState) => ({
            ...prevState,
            [year]: !prevState[year],
        }));
    };


    return (
        <div className="w-full min-h-screen bg-[#FFFEF3] overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Archive Header */}
            <div className="w-full pt-20 pb-20 bg-gradient-to-r from-[#C6FBFF] to-[#C0FFA3] text-center border-b border-[#ccc] max-[900px]:pt-5 max-[900px]:pb-5 max-[900px]:px-4">
                <div className="flex flex-col items-center max-w-[800px] mx-auto">
                    <h1
                        className="text-[40px] font-bold mb-2.5 leading-[39px] tracking-[1.6px] text-black max-[900px]:text-[30px]"
                        style={{ fontFamily: "'Inria Serif', serif" }}
                    >
                        BYTESTREAMS ARCHIVE
                    </h1>
                    <p
                        className="text-[16px] font-normal text-black mb-5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Explore these newsletters to witness the rich history of our society
                    </p>
                    {/* Dropdown filter (commented out) */}
                </div>
            </div>

            {/* Loading/Error States */}
            {loading && <LoadingCircle message="" />}
            {error && <p className="text-center text-red-600">{error}</p>}

            {/* Magazines Section */}
            {!loading && !error && (
                <div className="py-10 bg-[#FBFFFF] relative">
                    {Object.entries(pdfData)
                        .filter(([year]) => activeFilter === "ALL" || activeFilter === year)
                        .map(([year, pdfs], index) => (
                            <div
                                key={index}
                                className="mx-auto mb-10 max-w-[90%] bg-[#F0FDFF] rounded-[10px] p-5 shadow-[0_2px_5px_rgba(0,0,0,0.1)] max-[900px]:max-w-[95%]"
                            >
                                <div
                                    className="text-[24px] font-bold mb-5 px-2.5 text-black cursor-pointer"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                    onClick={() => toggleCardExpansion(year)}
                                >
                                    {year}
                                </div>
                                {expandedCards[year] && (
                                    <div
                                        className="flex overflow-x-auto scroll-snap-x-mandatory gap-[30px] px-2.5 pb-1.5 max-w-[1000px] mx-auto scrollbar-thin scrollbar-thumb-[#ccc] scrollbar-track-[#f5f5f5]"
                                        style={{
                                            scrollbarWidth: "thin",
                                            scrollbarColor: "#ccc #f5f5f5",
                                        }}
                                    >
                                        {pdfs.map((pdf, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-[0_0_calc(50%-15px)] min-w-[calc(50%-15px)] h-[300px] scroll-snap-start bg-[#FFF9F9] rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] relative transition-all duration-300 max-[900px]:min-w-full max-[900px]:h-auto max-[900px]:min-h-[250px]"
                                            >
                                                <div className="flex h-full p-5 max-[900px]:flex-row max-[900px]:p-4">
                                                    <div className="flex-1 flex flex-col justify-start pr-2.5 max-[900px]:justify-center max-[900px]:pr-3">
                                                        <h3
                                                            className="text-[28px] mb-5"
                                                            style={{ fontFamily: "'Italiana', serif" }}
                                                        >
                                                            {pdf.name}
                                                        </h3>
                                                        <button
                                                            className="bg-[#9DF4F8] border-none rounded-[8px] px-5 py-2 font-medium cursor-pointer mt-2.5 w-fit text-black text-[16px] max-[480px]:px-4 max-[480px]:text-[14px]"
                                                            onClick={() => {
                                                                setIsLoadingMagazine(true);
                                                                navigate("/pdf-viewer", {
                                                                    state: { pdfUrl: pdf.id },
                                                                });
                                                            }}
                                                        >
                                                            READ
                                                        </button>
                                                    </div>
                                                    <div className="flex-1 flex items-center justify-center max-w-auto h-auto max-[900px]:max-w-[45%] max-[900px]:h-[220px]">
                                                        <img
                                                            src={`http://localhost:5003/thumbnail?fileId=${pdf.id}`}
                                                            className="w-auto h-auto max-h-full object-contain max-[900px]:w-full max-[900px]:h-full"
                                                            alt="Buffered Reader"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
            {isLoadingMagazine && <LoadingCircle message="" />}
            <footer
                className="bg-[#333] text-white text-center py-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <p>
                    CSE Society: IIT ISM
                    <br /> Dhanbad
                </p>
            </footer>
        </div>
    );

};

export default ByteStreamPage;
