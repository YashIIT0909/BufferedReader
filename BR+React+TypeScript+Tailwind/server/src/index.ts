import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import cachePdfListRoutes from './routes/CachePdfList.routes';
import cacheSubFolderRoutes from './routes/CacheSubFolder.routes';
import cacheThumbnailRoutes from './routes/CacheThumbnail.routes';
import cacheDownloadRoutes from './routes/CacheDownload.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', cachePdfListRoutes);
app.use('/api', cacheSubFolderRoutes);
app.use('/api', cacheThumbnailRoutes);
app.use('/api', cacheDownloadRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});