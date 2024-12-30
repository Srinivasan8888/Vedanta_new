import express from 'express';
import * as InsertController from '../Controller/Insert.Controller.js';

const router = express.Router();

router.post('/createSensor1', InsertController.createSensor1);
router.post('/createSensor2', InsertController.createSensor2);
router.post('/createSensor3', InsertController.createSensor3);
router.post('/createSensor4', InsertController.createSensor4);
router.post('/createSensor5', InsertController.createSensor5);
router.post('/createSensor6', InsertController.createSensor6);
router.post('/createSensor7', InsertController.createSensor7);
router.post('/createSensor8', InsertController.createSensor8);
router.post('/createSensor9', InsertController.createSensor9);
router.post('/createSensor10', InsertController.createSensor10);

export default router;