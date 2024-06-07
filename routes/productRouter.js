const express = require('express')
const router = express.Router()
const shopController = require('../controllers/productController')
const userMiddleware = require('../middlewares/userMiddleware')
router.get('/',userMiddleware.isUser,shopController.getShop);


module.exports = router