import express from 'express';
// import { Aside, fetchAndSendSensorData } from '../Controller/Api.Controller.js';

import { fetchAndSendSensorData } from '../Controller/Api.Controller.js';


const router = express.Router();

// router.get('/getAside', Aside);
router.get('/getAside', fetchAndSendSensorData);


export default router;