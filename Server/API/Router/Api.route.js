import express from 'express'
import {ApiController} from '../Controller/Api.Controller.js';

const router = express.Router();

router.get('/getAside', ApiController.Aside);
router.get('/getBside', ApiController.Bside);
router.get('/getallsensor', ApiController.getallsensor);
router.get('/getcbname', ApiController.cbname);
// router.get('/getExcel'. ApiController.Excel)
router.get('/getExcel', ApiController.fetchSensorDataByKey)

export default router;