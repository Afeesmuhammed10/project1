const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
  sizeName: {
    type: String,
     required: true 
   }, 
  
isDeleted: { 
    type: Boolean,
     default: true
     }  
});

module.exports = mongoose.model('Size', sizeSchema);
