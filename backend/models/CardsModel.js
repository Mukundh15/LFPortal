const mongoose=require('mongoose');
const CardsSchema=require('../Schemas/CardsSchema');

const CardsModel=mongoose.model("Cards",CardsSchema);
module.exports=CardsModel;