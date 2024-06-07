const mongoose = require('mongoose');



const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    joindedDate:{
        type:String,
        required:true
    },
    walletAmount:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:true
    },
 
    verified:{
        type:Boolean,
        required:true
    },
    isAdmin:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("user",userSchema)