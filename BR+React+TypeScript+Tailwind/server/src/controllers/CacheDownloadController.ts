import { Request, Response } from 'express';
import { getCache, setCache } from '../utils/cache';
import { asyncHandler } from '../utils/asyncHandler';
import axios from 'axios';


export const CacheDownloadController = asyncHandler(async (req: Request, res: Response) => {
    const API_KEY = process.env.VITE_API_KEY;

    const fileId = req.query.fileId;
    if (!fileId) {
        console.error("❌ Missing fileId in request");
        res.status(400).send("Missing fileId");
        return;
    }

    try {
        let downloadUrl = await getCache(fileId as string);
        if (downloadUrl) {
            console.log("✅ Cache hit: Using cached download link.");
        } else {
            console.log("❌ Cache miss: Fetching new download link.");
            const metaResponse = await axios.get(
                `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webContentLink&key=${API_KEY}`
            );
            downloadUrl = metaResponse.data.webContentLink;
            if (!downloadUrl) throw new Error("Download link not found");
            setCache(fileId as string, downloadUrl);
        }

        const response = await axios.get(downloadUrl, { responseType: "stream" });
        response.data.pipe(res);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching file:", error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error("Error fetching file:", error.message);
        } else {
            console.error("Error fetching file:", error);
        }
        res.status(500).send("Failed to fetch the file.");
    }

}
)