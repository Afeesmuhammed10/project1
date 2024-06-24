const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    colors: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type:Array,
        required:true
    },
    images: {
        type: [String],
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    // isVariantAvailable: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // }

})

module.exports = mongoose.model('variants', variantSchema)