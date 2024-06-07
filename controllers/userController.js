
const bcrypt = require('bcrypt');
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const axios = require('axios')


let userEmail
let userdata
let OTP
let registerdEmail

//function for create otp
function createOtp() {
    const otp = (crypto.randomBytes(3).readUIntBE(0, 3) % 1000000).toString().padStart(6, '0');
    return otp
}

//function for generate token

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY);
}


//function for send otp

function sendOtp(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'afeesmuhammad703@gmail.com',
            pass: 'xenv aagh zqvs tmow'
        }
    });

    const mailOptions = {
        from: 'afeesmuhammad703@gmail.com',
        to: email,
        subject: 'Verification OTP',
        text: `please enter this OTP for your Email validation ${otp} `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error occurred:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

//get Home page
const getHomePgae = async (req, res) => {
    res.render('user/home', { user: req.user })
}

//get login page
const getLogin = (req, res) => {
    res.render('user/login')
}


//get registration page
const getRegister = (req, res) => {
    res.render('user/register');
}


//get otp email page
const otpEmail = (req, res) => {
    res.render('user/otpEmail')
}


//get otp page
const otpVerfication = (req, res) => {
    OTP = createOtp();
    sendOtp(registerdEmail, OTP)
    res.render('user/otpPage')
}


//user registration
const userRegistration = async (req, res) => {
    console.log(req.body)
    const { name, email, phone, password } = req.body
    let emailAlReadyExist = false

    let checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
        emailAlReadyExist = true
    }
    if (!emailAlReadyExist) {
        let date = new Date();
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        let localdate = date.toLocaleDateString('en-GB', options);
        let hashedPasword = await bcrypt.hash(password, 10)
        const payload = { name: name, email: email }
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        console.log(token)
        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPasword,
            isBlocked: false,
            walletAmount: 0,
            jwttoken: token,
            joindedDate:localdate,
            verified: false,
           isAdmin:false
        })
        console.log(user)

        if (user) {
            registerdEmail = user.email
            res.redirect('/registerotpVerification')
        }
    } else {
        console.log("email already exist")
        return res.render('user/register', { err: "entered Email is already exist" })
    }

}

//user login
const userLogin = async (req, res) => {
    const { email, password } = req.body


    let user = await User.findOne({ email: email });
    console.log(user)

    if (user) {
        let checkPssword = await bcrypt.compare(password, user.password)
        if (checkPssword) {
            const payload = {
                id: user._id,
                name: user.name
            }
            const token = generateToken(payload)
            console.log(token)
            res.cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            res.redirect('/')
        } else {
            res.render('user/login', { err: "check entered Password is correct" })
        }
    } else {
        res.render('user/login', { err: "check entered Email address is correct" })
    }
}

//verify otp for registration
const verifyRegisterOtp = async (req, res) => {

    console.log("query is ", req.query.data)
    if (OTP == req.query.data) {
        let user = await User.findOneAndUpdate(
            { email: registerdEmail },
            {
                $set: {
                    verified: true
                }
            }
        )
        console.log(user);
        if (user) {

            const payload = {
                id: user._id,
                name: user.name
            }
            const token = generateToken(payload)
            console.log(token)
            res.cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            res.status(200).send("otp verified successfully")
        }
    }
};

//resend otp

const resendOtp = (req, res, next) => {
    OTP = createOtp();
    sendOtp(registerdEmail, OTP);
    next();
}

//otp login

const otpLogin = (req,res)=>{
    res.render('user/otpemail')
}

// check is email verified

const checkOtpEmail = async(req,res)=>{
    let email = req.body.email;
    const user =await User.findOne({email:email});
    if(user){
        if(user.verified == true){
            registerdEmail = user.email
            res.redirect('/registerotpVerification')
        }
    }else{
        res.render('user/otpEmail',{err:"invalid Email address"})
      
    }
    
}



module.exports = {
    getHomePgae,
    getLogin,
    getRegister,
    otpVerfication,
    otpEmail,
    userRegistration,
    userLogin,
    verifyRegisterOtp,
    registerdEmail,
    resendOtp,
    otpLogin,
    checkOtpEmail
}