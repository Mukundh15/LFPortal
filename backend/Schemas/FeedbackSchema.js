const mongoose=require('mongoose');
const FeedbackSchema=new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    },
    Description:{
        type:String
    }
});
module.exports=FeedbackSchema;