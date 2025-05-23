import { generateAndSendReports } from '../Controller/ReportsController.js';
import { Router } from 'express';
import cron from 'node-cron';


const router = Router();

cron.schedule('0 9 * * *', async () => {
  console.log('Running daily report generation...');
  try {
    await generateAndSendReports();
  } catch (error) {
    console.error('Error in daily report generation:', error);
  }
});

cron.schedule('0 9 * * 1', async () => {
  console.log('Running weekly report generation...');
  try {
    await generateAndSendReports();
  } catch (error) {
    console.error('Error in weekly report generation:', error);
  }
});

cron.schedule('0 9 1 * *', async () => {
  console.log('Running monthly report generation...');
  try {
    await generateAndSendReports();
  } catch (error) {
    console.error('Error in monthly report generation:', error);
  }
});

export default router;
