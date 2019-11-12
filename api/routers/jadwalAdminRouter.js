const express = require('express')
const {JadwalAdminController} = require('../controllers')

const router = express.Router()

router.get('/getKategoriLangganan', JadwalAdminController.getKategoriLangganan)

module.exports = router
