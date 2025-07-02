import { useState, useEffect } from "react"; // Import useEffect
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for fetching the PDF
import LoadingCircle from "./LoadingCircle.tsx";
// Set up the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

const PdfViewer = () => {
    const location = useLocation();
    const fileId = location.state?.pdfUrl || ""; // Get the file ID from location state
    const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null); // Blob URL for the PDF
    const [numPages, setNumPages] = useState<number | null>(null); // Total number of pages
    const [pageNumber, setPageNumber] = useState<number>(1); // Current page number
    const [error, setError] = useState<string | null>(null); // Error state
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!fileId) {
            setError("No file ID provided.");
            setIsLoading(false);
            return;
        }

        // Fetch the PDF file using the proxy server
        const fetchPdf = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/download?fileId=${fileId}`,
                    { responseType: "arraybuffer" }
                );

                // Convert the file content to a Blob URL
                const blob = new Blob([response.data], { type: "application/pdf" });
                const blobUrl = URL.createObjectURL(blob);
                setPdfBlobUrl(blobUrl);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching PDF:", err);
                setError(
                    "Failed to fetch the PDF. Please check the file ID and try again."
                );
                setIsLoading(false);
            }
        };

        fetchPdf();
    }, [fileId]);

    // Handle PDF load success
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1); // Reset to the first page when a new PDF is loaded
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-5 bg-[#f9f9f9] max-[768px]:p-2">
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start mb-1.5 px-3 py-2 text-[16px] font-bold text-white bg-[#007bff] rounded-[5px] border-none cursor-pointer transition-colors duration-300 hover:bg-[#0056b3] max-[768px]:text-[14px] max-[768px]:px-2 max-[768px]:py-1.5"
                    >
                        ⬅ Go back
                    </button>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-[15px] mt-[15px]">
                        <button
                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                            disabled={pageNumber === 1}
                            className={`px-4 py-2 text-[14px] font-bold rounded-[5px] border-none cursor-pointer transition-colors duration-300 ${pageNumber === 1
                                ? "bg-[#d3d3d3] cursor-not-allowed text-black"
                                : "bg-[#007bff] text-white hover:bg-[#0056b3]"
                                } max-[768px]:text-[12px] max-[768px]:px-3 max-[768px]:py-1.5`}
                        >
                            ⬅ Previous
                        </button>
                        <button
                            onClick={() => {
                                if (numPages) {
                                    setPageNumber((prev) => Math.min(prev + 1, numPages));
                                }
                            }}
                            disabled={pageNumber === numPages}
                            className={`px-4 py-2 text-[14px] font-bold rounded-[5px] border-none cursor-pointer transition-colors duration-300 ${pageNumber === numPages
                                ? "bg-[#d3d3d3] cursor-not-allowed text-black"
                                : "bg-[#007bff] text-white hover:bg-[#0056b3]"
                                } max-[768px]:text-[12px] max-[768px]:px-3 max-[768px]:py-1.5`}
                        >
                            Next ➡
                        </button>
                    </div>

                    {/* Page Indicator */}
                    <p className="mt-2.5 text-[16px] font-bold text-[#333]">{`Page ${pageNumber} of ${numPages}`}</p>
                    {isLoading ? (
                        <LoadingCircle />
                    ) : (
                        pdfBlobUrl && (
                            <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page
                                    pageNumber={pageNumber}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    width={window.innerWidth > 800 ? 800 : window.innerWidth * 0.9}
                                    className="flex justify-center"
                                // Canvas styling below is handled by react-pdf, but you can target it globally if needed
                                />
                            </Document>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default PdfViewer;
