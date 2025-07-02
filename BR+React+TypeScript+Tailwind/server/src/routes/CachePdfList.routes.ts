import express from 'express';
import { CachePdfListController } from '../controllers/CachePdfListController';
const router = express.Router();

router.get('/pdfs', CachePdfListController);

export default router;

