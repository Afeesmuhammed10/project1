const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const Category = require('../models/categorySchema')


//function for create otp
function createOtp() {
    const otp = (crypto.randomBytes(3).readUIntBE(0, 3) % 1000000).toString().padStart(6, '0');
    return otp
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




//generate token
function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY);
}


//get admin dash
const getAdminDash = (req, res) => {
    res.render('admin/admindash', { admin: req.admin.name });
    console.log(req.admin)
}

//get admin login

const getAdminLogin = (req, res) => {
    res.render('admin/adminlogin')
}


//get Category

const getCategory = async(req, res) => {
    let categories = await Category.find({isDeleted:false})
    res.render('admin/category',{categories:categories});
}

//validate admin login

const validateLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const user = await User.findOne({ email: email });
         console.log(user)
        if (user) {
            const isPassword = await bcrypt.compare(password, user.password)

            if (isPassword) {
                const payload = {
                    id: user._id,
                    name: user.name
                }

                if (user.isAdmin){
                    const token = generateToken(payload);
                    req.session.token = token
                    let admintoken = req.session.token
                    res.cookie("admintoken", admintoken, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true
                    });
                    res.redirect('/admin')
                }



            } else {
                throw new Error("invalid password")
            }

        } else {
            throw new Error("invalid email")
        }
    } catch (err) {
        console.log(err)
        res.render('admin/adminlogin', { err: "invalid email and password" })
    }
}

//admin otp login 

const getadminotpemail = (req, res) => {
    res.render('admin/adminotpemail')
}


//verify admin otp email

const verifyOtpEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email, email })

    if (user) {
        if (user.verified == true) {
            res.redirect('/admin/adminotp')
            let otp = createOtp();
            req.session.otp = otp
            console.log("otp is ",otp);
           req.session.payload = {
                id:user._id,
                name:user.name
            }
            sendOtp(user.email,otp)
        }
    } else {
        res.render('admin/adminotpemail', { err: "invalid Email" })
    }
}

//adminotp
const getAdminOtp = (req, res) => {
    console.log("otp is ",req.otp);
    res.render('admin/adminotp')
    
}

//getlist users

const getUser = async (req,res)=>{
    let user = await User.find({isBlocked : false} )


    res.render('admin/listusers',{users:user})
}

//get Blocked users

const getBlockedUser = async (req,res)=>{
    let user = await User.find({isBlocked : true} )


    res.render('admin/blockedusers',{users:user})
}

//get deleted categries

const getDeletedCategories =async (req,res)=>{
    let delCat = await Category.find({isDeleted:true});
    res.render('admin/deletedcategories',{category:delCat})
}


//get add new category

const getAddNewCategory= (req,res)=>{
    res.render('admin/addcategory')
}

//verifyadmin otp

const verifyadminotp = (req,res) => {
    const otp = req.query.data
    let adminotp = req.session.otp
    if( adminotp == otp){
        req.session.otp = null
        console.log("otp verified")
       let token = generateToken(req.session.payload)
       req.session.token = token
       let admintoken =  req.session.token
        console.log("token is :", admintoken)
        res.cookie("admintoken", admintoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        res.redirect('/admin')
        console.log("token is :", admintoken)
    }else{

        res.render('admin/adminotp',{err:"invalid otp"})
    }
    
}

//block user

const blockuser = async(req,res)=>{
    let userId = req.query.userId;
console.log(`id is ${userId}`)
    let user = await User.updateOne(
        {_id:userId},
        {
            $set:{
                isBlocked:true
            }
        }
    )

    if(user){
        res.status(200).send("user blocked suceessfully")
    }
}

//unblock user

const unBlockuser = async(req,res)=>{
    let userId = req.query.userId;
console.log(`id is ${userId}`)
    let user = await User.updateOne(
        {_id:userId},
        {
            $set:{
                isBlocked:false
            }
        }
    )

    if(user){
        res.status(200).send("user blocked suceessfully")
    }
}


module.exports = {
    getAdminDash,
    getCategory,
    getAdminLogin,
    validateLogin,
    getadminotpemail,
    getAdminOtp,
    verifyOtpEmail,
    verifyadminotp,
    getUser,
    blockuser,
    getBlockedUser,
    unBlockuser,
    getDeletedCategories,
    getAddNewCategory
}