import { Request, Response } from 'express';
import { getCache, setCache } from '../utils/cache';
import { asyncHandler } from '../utils/asyncHandler';
import axios from 'axios';


export const CachePdfListController = asyncHandler(async (req: Request, res: Response) => {
    const API_KEY = process.env.VITE_API_KEY;

    const folderId = req.query.folderId;
    if (!folderId) {
        console.error("❌ Missing folderId in request");
        res.status(400).send("Missing folderId");
        return;
    }

    const cacheKey = `pdfs_${folderId}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log("✅ Serving PDFs from cache");
        res.json(cachedData);
        return;
    }

    try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${API_KEY}&fields=files(id, name, webViewLink)`;
        const response = await axios.get(url);
        const pdfs = response.data;
        console.log("✅ Fetched PDFs from Google Drive API:", pdfs);

        await setCache(cacheKey, pdfs);
        res.json(pdfs);
    } catch (error) {
        console.error("❌ Error fetching PDFs:", error);
        res.status(500).send("Internal Server Error");
    }

}
)