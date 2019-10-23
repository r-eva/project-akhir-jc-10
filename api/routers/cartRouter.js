const express = require('express')
const {cartController} = require('../controllers')

const router = express.Router()

router.post('/addToCart', cartController.addToCart)
router.get('/getCartUser/:id', cartController.getCartByIdUser)
router.put('/editCart/:id', cartController.editCart)

module.exports = router
