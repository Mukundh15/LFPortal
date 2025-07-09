const mongoose=require('mongoose');
const SupportSchema=require('../Schemas/SupportSchema');

const SupportModel=mongoose.model("Support",SupportSchema);
module.exports=SupportModel;