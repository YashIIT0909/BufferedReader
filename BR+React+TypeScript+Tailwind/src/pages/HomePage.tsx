import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage2 from "/logo.png";
import Navbar from "../components/Navbar";

const BUFFERED_READERS_FOLDER_ID = "1inj0AM4qnEjLr88-7_SGGvQpuTv804rH";

type PdfFile = {
    id: string;
    name: string;
    [key: string]: any;
};

const HomePage = () => {
    const navigate = useNavigate();
    const [latestPdf, setLatestPdf] = useState<PdfFile | null>(null);
    const [isLoadingMagazine, setIsLoadingMagazine] = useState<boolean>(false);

    useEffect(() => {
        async function fetchLatestPdf() {
            try {
                const url = `http://localhost:5003/pdfs?folderId=${BUFFERED_READERS_FOLDER_ID}`;
                const response = await axios.get(url);
                if (response.data.files.length > 0) {
                    setLatestPdf(response.data.files[0]);
                }
            } catch (error) {
                console.error("Error fetching PDFs:", error);
            }
        }
        fetchLatestPdf();
    }, []);

    return (
        <div className="w-full min-h-screen bg-white">
            <Navbar />

            {/* Journal Header */}
            <div className="flex justify-center py-[2rem]">
                <div className="flex items-center w-4/5 max-[900px]:flex-col">
                    <div className="mr-8 max-[900px]:mr-0 max-[900px]:mb-4">
                        <img src={logoImage2} alt="Journal Logo" className="w-[60px]" />
                    </div>
                    <div className="flex-grow text-center">
                        <p
                            className="text-[1.2rem] text-[#333] mb-2 font-normal tracking-[1.2px]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Computer Science and Engineering Society's
                        </p>
                        <h1
                            className="text-[2.5rem] font-normal text-[#333] tracking-[2.4px]"
                            style={{ fontFamily: "Inria Sans, sans-serif" }}
                        >
                            TECH JOURNAL
                        </h1>
                    </div>
                </div>
            </div>

            {/* Latest Section */}
            <section className="flex bg-gradient-to-b from-[#FFFBAB] to-[#F9B9E6] py-[2rem] px-[5%] max-[900px]:flex-col">
                <div className="flex-1 flex flex-col justify-center pr-[2rem] max-[900px]:mb-6 max-[900px]:pr-0">
                    <div className="flex flex-col justify-center h-full">
                        <h2
                            className="text-[1.5rem] text-[#333] mb-4 italic font-medium"
                            style={{ fontFamily: "Instrument Sans, sans-serif" }}
                        >
                            LATEST...
                        </h2>
                        <div>
                            <h3
                                className="text-[2.25rem] text-[#333] font-extralight"
                                style={{ fontFamily: "Inter, sans-serif", fontWeight: 200 }}
                            >
                                CSES Tech Insights
                            </h3>
                            <p
                                className="text-[1.75rem] text-[#333] font-extralight"
                                style={{ fontFamily: "Inter, sans-serif", fontWeight: 200 }}
                            >
                                Past & Present
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-2 flex justify-start items-center py-[1rem] max-[900px]:py-[1rem]">
                    <div className="flex bg-white rounded-[8px] overflow-hidden shadow-[2px_6px_8px_4px_rgba(0,0,0,0.25)] w-[70%] max-w-[500px] h-auto max-[900px]:flex-row max-[900px]:w-full max-[900px]:max-w-[450px] max-[900px]:mx-auto">
                        <div className="mt-[2rem] flex-1 p-[1.5rem] max-[900px]:flex-[1.2]">
                            <center>
                                <h3 style={{ fontFamily: "Italiana", fontSize: "2rem" }}>{latestPdf ? latestPdf.name : " "}</h3>

                            </center>
                            <center>
                                <button
                                    className="bg-[#F3FB59] text-black border-none px-[1rem] py-[0.5rem] text-[1rem] font-normal rounded-[8px] cursor-pointer mt-12"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                    onClick={() => {
                                        if (!latestPdf) return alert("No PDF available.");
                                        setIsLoadingMagazine(true);
                                        navigate("/pdf-viewer", {
                                            // state: { pdfUrl: latestPdf.id },
                                        });
                                    }}
                                >
                                    {isLoadingMagazine ? "Loading..." : "READ"}
                                </button>
                            </center>
                        </div>
                        <div className="flex-1 max-w-[45%] h-auto min-h-[220px] max-[900px]:h-[180px] max-[480px]:h-[200px]">
                            {latestPdf ? (
                                <img
                                    src={`http://localhost:5003/thumbnail?fileId=${latestPdf.id}&nocache=${Date.now()}`}
                                    alt="Buffered Reader"
                                    className="w-full h-full object-cover max-[480px]:object-contain"
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* Purpose Section */}
            <section className="flex p-[4.5rem_5%] bg-[#FFFDEA] rounded-[12px] m-[2rem_5%] shadow-[2px_6px_8px_4px_rgba(0,0,0,0.25)] max-[900px]:flex-col">
                <div className="flex-1 flex items-center justify-center max-[900px]:mb-[1.5rem] max-[900px]:justify-start">
                    <div className="flex items-center h-full justify-center max-[900px]:justify-start">
                        <h2
                            className="text-[2rem] text-[#333] font-"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            PURPOSE
                        </h2>
                    </div>
                </div>
                <div className="flex-[3] pl-[5rem] pr-[5rem] max-[900px]:pl-0 max-[900px]:pr-0">
                    <h3
                        className="text-[2rem] text-[#333] mb-4 font-bold"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        What we Aim?
                    </h3>
                    <p
                        className="text-[1.25rem] leading-[2.4] text-[#333] font-normal"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        The aim of the CSE Society is to create a dynamic and supportive
                        environment that nurtures the technical and creative abilities of
                        students in the field of computer science and engineering. We aim to
                        bridge the gap between theoretical knowledge and practical
                        application by organizing a variety of events, workshops, and
                        collaborative projects.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="bg-[#333] text-white text-center py-6"
                style={{ fontFamily: "Inter, sans-serif" }}
            >
                <p>
                    CSE Society: IIT ISM
                    <br />
                    Dhanbad
                </p>
            </footer>
        </div>
    )
}

export default HomePage