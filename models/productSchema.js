const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true
    },
    gender:{
        type: String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.model('product',productSchema)