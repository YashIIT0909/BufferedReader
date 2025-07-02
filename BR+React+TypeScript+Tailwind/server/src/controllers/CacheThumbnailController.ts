import { Request, Response } from 'express';
import { getCache, setCache } from '../utils/cache';
import { asyncHandler } from '../utils/asyncHandler';
import axios from 'axios';


export const CacheThumbnailController = asyncHandler(async (req: Request, res: Response) => {


    const fileId = req.query.fileId;
    if (!fileId) {
        console.error("❌ Missing fileId in request");
        res.status(400).send("Missing fileId");
        return;
    }

    const cacheKey = `thumbnail_${fileId}`;
    const cachedImage = await getCache(cacheKey);
    if (cachedImage) {
        console.log("✅ Serving thumbnail from cache");
        res.setHeader("Content-Type", "image/jpeg");
        res.json(cachedImage);
        return;
    }

    try {
        const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;
        const response = await axios.get(url, { responseType: "arraybuffer" });
        if (!response.data) {
            console.error("❌ No thumbnail found or invalid response format");
            res.status(404).send("No thumbnail found");
            return;
        }
        const thumbnail = response.data;
        console.log("✅ Fetched thumbnail from Google Drive API:", thumbnail);

        await setCache(cacheKey, thumbnail);
        res.setHeader("Content-Type", "image/jpeg");
        res.send(thumbnail);

    } catch (error) {

        console.error("❌ Error fetching thumbnail:", error);
        res.status(500).send("Internal Server Error");
    }

}
)