const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('category',categorySchema)