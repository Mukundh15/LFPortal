const mongoose=require('mongoose');
const FeedbackSchema=require('../Schemas/FeedbackSchema');

const FeedbackModel=mongoose.model("Feedback",FeedbackSchema);

module.exports=FeedbackModel;