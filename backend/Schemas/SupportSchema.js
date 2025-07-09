const mongoose=require('mongoose');
const SupportSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: { 
        type: String
    },
    problem:{
        type: String,
        required: true
    }
})
module.exports=SupportSchema;