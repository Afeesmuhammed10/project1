
const mongoose = require('mongoose');
const connection = ()=>{
    try{
        mongoose.connect('mongodb+srv://afeesmuhammad703:C3Udu7EsY9kl07iT@cluster0.u6bffiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/malefashion')
        console.log("mongodb connected successfully...")
    }catch(err){
        throw new Error(err)
    }
   
}

module.exports = {
    connection
}