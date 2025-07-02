import express from 'express';
import { CacheThumbnailController } from '../controllers/CacheThumbnailController';
const router = express.Router();

router.get('/thumbnail', CacheThumbnailController);

export default router;

