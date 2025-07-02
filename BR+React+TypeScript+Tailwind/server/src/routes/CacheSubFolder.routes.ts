import express from 'express';
import { CacheSubFolderController } from '../controllers/CacheSubFolderController';
const router = express.Router();

router.get('/subfolders', CacheSubFolderController);

export default router;

