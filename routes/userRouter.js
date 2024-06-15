const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const userMiddleware = require('../middlewares/userMiddleware')

router.get('/',userMiddleware.isNotAToken,userMiddleware.isUser,userController.getHomePgae);
router.get('/login',userMiddleware.isToken,userController.getLogin);
router.get('/register',userMiddleware.isToken,userController.getRegister);
router.get('/registerotpVerification',userMiddleware.isToken,userController.otpVerfication);
router.get('/otplogin',userMiddleware.isToken,userController.otpEmail)
router.get('/productdetails',userController.getProductDetails)

router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)
router.post('/registerotpVerification',userController.verifyRegisterOtp)

router.get('/resendotp',userController.resendOtp,userController.otpVerfication)
router.get('/otplogin',userController.otpLogin);
router.post('/otplogin',userController.checkOtpEmail)
module.exports = router