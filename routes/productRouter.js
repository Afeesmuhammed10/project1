const express = require('express')
const router = express.Router()
const shopController = require('../controllers/productController')
const userMiddleware = require('../middlewares/userMiddleware')
const productController = require('../controllers/productController')
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });
  
  const upload = multer({ storage: storage });

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
router.post('/addproductvariant',upload.any(),productController.addProductVariant)

router.get('/colors',productController.getColors)

router.get('/addcolors',productController.getAddNewColors)
router.post('/addcolors',productController.addNewColor)
router.post('/deletecolors',productController.deleteColor)
router.get('/deletedcolors',productController.deletedColors)

router.get('/sizes',productController.getSizes)
router.get('/addsizes',productController.getAddSizes)
router.post('/addsizes',productController.addSizes)


router.get('/prodcutview/:id',productController.getProductview) 
module.exports = router