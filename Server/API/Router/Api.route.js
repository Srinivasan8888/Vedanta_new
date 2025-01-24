import express from 'express'
import {ApiController} from '../Controller/Api.Controller.js';

const router = express.Router();

router.get('/getAside', ApiController.Aside);
router.get('/getBside', ApiController.Bside);
router.get('/getallsensor', ApiController.getallsensor);
router.get('/getcbname', ApiController.cbname);
router.get('/getAverageExcel', ApiController.fetchSensorDataByaverage)
router.get('/getIntervalExcel', ApiController.fetchSensorDataByinterval)
router.get('/getDateExcel', ApiController.fetchSensorDataByDate)
router.get('/getLimit', ApiController.fetchSensorDataBylimit)
router.get('/getAverageChart', ApiController.fetchSensorDataByaveragegraph)



export default router;