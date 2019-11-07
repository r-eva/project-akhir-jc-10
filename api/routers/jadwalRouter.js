const express = require('express')
const {jadwalController} = require('../controllers')

const router = express.Router()

router.get('/getJadwalByIdPaket/:id', jadwalController.getJadwalByIdPaket)
router.get('/getAllMenu', jadwalController.getAllMenu)

module.exports = router
