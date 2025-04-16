import express from 'express';
import { createReport, createAlert, alertFrequency, reportUsers, getFrequency} from '../Controller/Admin.Controller.js';

const router = express.Router();

router.post('/createReport', createReport);
router.post('/setFrequency', alertFrequency);
router.post('/createAlert', createAlert);
//get request
router.get('/getReportUsers', reportUsers);
router.get('/getFrequency', getFrequency);

export default router;