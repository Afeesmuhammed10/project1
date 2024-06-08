const express = require('express')
const router = express.Router()
const shopController = require('../controllers/productController')
const userMiddleware = require('../middlewares/userMiddleware')
const productController = require('../controllers/productController')

router.get('/',userMiddleware.isUser,shopController.getShop);
router.post('/addnewcategory',productController.addnewcategory)
router.post('/deletecategory',productController.deletecategory);
router.post('/restorecategory',productController.restoreCat)
router.get('/editcategory/:categoryId',productController.getEditcat)

router.post('/editcategory/:catId',productController.editCat)


module.exports = router