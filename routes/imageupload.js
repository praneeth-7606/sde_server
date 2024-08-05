// routes/authroute.js
import express from 'express';
import { generateOgImage, upload } from '../controller/ogController.js';

const router = express.Router();

router.post('/generate-og-image', upload.single('image'), generateOgImage);

export default router;
