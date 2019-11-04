const express = require('express')
const {langgananController} = require('../controllers')

const router = express.Router()

router.get('/getKategoriLangganan', langgananController.getKategoriLangganan)
router.get('/getKategoriLanggananById/:id', langgananController.getKategoriLanggananById)
router.put('/addImageLangganan/:id', langgananController.addImageLangganan)
router.post('/editLanggananById/:id', langgananController.editLanggananById)

module.exports = router
