const express = require('express')
const router = express.Router()
const ApiController = require('../Controller/Api.Controller')

router.get('/getAside', ApiController.Aside)

module.exports = router