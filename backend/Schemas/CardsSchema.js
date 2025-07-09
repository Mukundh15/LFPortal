const mongoose=require('mongoose');
const CardsSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nameid:{
        type:String,
        required:true
    },
    productName:{
        type: String,
        required: true
    },
    productDiscription:{
        type: String,
        required: true
    },
    item:{
        type: String,
        enum:['Found', 'Lost'],
        required:true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true
    }

})
module.exports=CardsSchema;