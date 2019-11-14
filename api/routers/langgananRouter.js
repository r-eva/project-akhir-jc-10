const express = require('express')
const {langgananController} = require('../controllers')

const router = express.Router()

router.get('/getKategoriLangganan', langgananController.getKategoriLangganan)
router.get('/getKategoriLanggananById/:id', langgananController.getKategoriLanggananById)
router.put('/addImageLangganan/:id', langgananController.addImageLangganan)
router.put('/editImageLanggananById/:id', langgananController.editImageLanggananById)
router.put('/editLanggananById/:id', langgananController.editLanggananById)
router.post('/addLanggananJadwalLama/', langgananController.addLanggananJadwalLama)
router.post('/addLanggananJadwalBaru/', langgananController.addLanggananJadwalBaru)
router.delete('/hapusPaketLangganan/', langgananController.hapusPaketLangganan)
router.get('/getKategoriLanggananPromo', langgananController.getKategoriLanggananPromo)

module.exports = router
