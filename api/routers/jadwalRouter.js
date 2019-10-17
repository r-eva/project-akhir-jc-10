const express = require('express')
const {jadwalController} = require('../controllers')

const router = express.Router()

router.get('/getJadwalByIdPaket/:id', jadwalController.getJadwalByIdPaket)

module.exports = router
