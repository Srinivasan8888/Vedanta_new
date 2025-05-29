import { generateAndSendReports } from '../Controller/ReportsController.js';
import { Router } from 'express';
import cron from 'node-cron';


const router = Router();

// Daily report generation at 9 AM IST
const dailyCron = cron.schedule('0 9 * * *', async () => {
  console.log('Running daily report generation...');
  try {
    await generateAndSendReports();
  } catch (error) {
    console.error('Error in daily report generation:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

// Weekly report generation at 9 AM IST on Monday
const weeklyCron = cron.schedule('0 9 * * 1', async () => {
  console.log('Running weekly report generation...');
  try {
    await generateAndSendReports();
  } catch (error) {
    console.error('Error in weekly report generation:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

// Monthly report generation at 9 AM IST on 1st of the month
const monthlyCron = cron.schedule('0 9 1 * *', async () => {
  console.log('Running monthly report generation...');
  try {
    await generateAndSendReports();
  } catch (error) {
    console.error('Error in monthly report generation:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

// Start all cron jobs
[dailyCron, weeklyCron, monthlyCron].forEach(cronJob => cronJob.start());

// Export the cron jobs for testing
export const reportCron = {
  dailyCron,
  weeklyCron,
  monthlyCron
};

export default router;
