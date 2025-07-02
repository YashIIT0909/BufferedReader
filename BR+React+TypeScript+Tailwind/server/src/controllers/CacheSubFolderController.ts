import { Request, Response } from 'express';
import { getCache, setCache } from '../utils/cache';
import { asyncHandler } from '../utils/asyncHandler';
import axios from 'axios';


export const CacheSubFolderController = asyncHandler(async (req: Request, res: Response) => {
    const API_KEY = process.env.VITE_API_KEY;

    const folderId = req.query.folderId;
    if (!folderId) {
        console.error("❌ Missing folderId in request");
        res.status(400).send("Missing folderId");
        return;
    }

    const cacheKey = `subfolders_${folderId}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log("✅ Serving subfolders from cache");
        res.json(cachedData);
        return;
    }

    try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id, name)`;
        const response = await axios.get(url);
        if (!response.data || !response.data.files) {
            console.error("❌ No subfolders found or invalid response format");
            res.status(404).send("No subfolders found");
            return;
        }
        const subfolders = response.data;
        console.log("✅ Fetched subfolders from Google Drive API:", subfolders);

        await setCache(cacheKey, subfolders);
        res.json(subfolders);
    } catch (error) {
        console.error("❌ Error fetching subfolders:", error);
        res.status(500).send("Internal Server Error");
    }

}
)