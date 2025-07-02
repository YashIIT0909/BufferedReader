import express from 'express';
import { CacheDownloadController } from '../controllers/CacheDownloadController';
const router = express.Router();

router.get('/download', CacheDownloadController);

export default router;

