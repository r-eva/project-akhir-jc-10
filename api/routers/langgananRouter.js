const express = require('express')
const {langgananController} = require('../controllers')

const router = express.Router()

router.get('/getKategoriLangganan', langgananController.getKategoriLangganan)
router.get('/getKategoriLanggananById/:id', langgananController.getKategoriLanggananById)

module.exports = router
