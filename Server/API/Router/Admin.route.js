import express from 'express';
import { createReport, createAlert, createSetAlert, getUserAlertRange, SaveAlertRange, SetAlertFrequency,getAlertFrequency, AlertfreqUsers, alertFrequency, reportUsers, getFrequency, getUsers} from '../Controller/Admin.Controller.js';

const router = express.Router();

router.post('/createReport', createReport);
router.post('/setFrequency', alertFrequency);
router.post('/createAlert', createAlert);
router.post('/createAlertUsers', createSetAlert);
router.post('/createSetAlertFrequency', SetAlertFrequency);
router.post('/SaveUserAlert', SaveAlertRange);

//get request
router.get('/getReportUsers', reportUsers);
router.get('/getAlertFreqUsers', AlertfreqUsers);
router.get('/getFrequency', getFrequency);
router.get('/getAlertFrequency', getAlertFrequency);
router.get('/getUserAlertRange', getUserAlertRange);
router.get('/getUsers', getUsers)

export default router;