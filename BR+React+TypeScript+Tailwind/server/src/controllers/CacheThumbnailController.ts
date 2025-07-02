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
    const cachedBase64 = await getCache(cacheKey);

    if (cachedBase64) {
        console.log("✅ Serving thumbnail from cache");
        const cachedBuffer = Buffer.from(cachedBase64, 'base64');
        res.setHeader("Content-Type", "image/jpeg");
        res.send(cachedBuffer);
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
        const thumbnailBuffer = Buffer.from(response.data);
        const base64Thumbnail = thumbnailBuffer.toString('base64');

        await setCache(cacheKey, base64Thumbnail); // Store as base64 string
        res.setHeader("Content-Type", "image/jpeg");
        res.send(thumbnailBuffer);

    } catch (error) {

        console.error("❌ Error fetching thumbnail:", error);
        res.status(500).send("Internal Server Error");
    }

}
)