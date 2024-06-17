const mongoose = require('mongoose');



const varientSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    productId:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    size:{
        type:String,
        required:true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("varient", varientSchema)