const express = require('express')
const router = express.Router()
const shopController = require('../controllers/productController')
const userMiddleware = require('../middlewares/userMiddleware')
const productController = require('../controllers/productController')

router.get('/',productController.getProducts)
router.post('/addnewcategory',productController.addnewcategory)
router.post('/deletecategory',productController.deletecategory);
router.post('/restorecategory',productController.restoreCat)
router.get('/editcategory/:categoryId',productController.getEditcat)

router.post('/editcategory/:catId',productController.editCat)

router.get('/addproducts',productController.getAddProducts)

router.get('/brands',productController.getBrands)
router.get('/addnewbrand',productController.getAddBrands)

router.post('/addnewbrand',productController.addNewBrand)
router.post('/deletebrand',productController.deleteBrand)

router.get('/deletedbrands',productController.getdeletedBrands)

router.post('/restorebrand',productController.restoreBrand)
router.get('/editbrand/:brandId',productController.getEditBrand)

router.post('/editbrand/:brandId',productController.editBrand)

router.post('/addproducts',productController.addProducts)

module.exports = router