import express from 'express'

const router = express.Router();
import {ApiController} from '../Controller/Api.Controller.js';

router.get('/getAside', ApiController.Aside);
router.get('/getBside', ApiController.Bside);

export default router;
