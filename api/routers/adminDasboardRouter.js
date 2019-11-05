const express = require('express')
const {adminDasboardController} = require('../controllers')

const router = express.Router()

router.get('/getTransaksiMenunggu', adminDasboardController.getTransaksiMenunggu)
router.put('/confirmPembayaran/:id', adminDasboardController.confirmPembayaran)

module.exports = router
