const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware')


router.get('/',adminMiddleware.adminAuth,adminController.getAdminDash);
router.get('/login',adminController.getAdminLogin)
router.get('/category',adminController.getCategory)

router.post('/login',adminController.validateLogin)

router.get('/adminotplogin',adminController.getadminotpemail)
router.get('/adminotp',adminController.getAdminOtp);

router.post('/verifyotpemail',adminController.verifyOtpEmail)
router.post('/otpVerification',adminController.verifyadminotp)

router.get('/users',adminController.getUser);

router.post('/blockuser',adminController.blockuser)

router.get('/bolckedusers',adminController.getBlockedUser)

router.post('/unblockuser',adminController.unBlockuser)

router.get('/deletedcategories',adminController.getDeletedCategories)

router.get('/addcategory',adminController.getAddNewCategory)

module.exports = router