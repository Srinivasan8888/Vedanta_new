import express from 'express';
import { generateAndSendReports, updateReportFrequency } from '../Controller/ReportsController.js';

const router = express.Router();

// Route to generate and send reports
router.post('/generate', generateAndSendReports);

// Route to update user's report frequency
router.post('/update-frequency', updateReportFrequency);

export default router;
