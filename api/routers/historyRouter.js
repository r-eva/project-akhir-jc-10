const express = require('express')
const {historyController} = require('../controllers')

const router = express.Router()

router.post('/addToHistory', historyController.addToHistory)

module.exports = router
