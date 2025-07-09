const mongoose=require('mongoose');
const UserSchema=require('../Schemas/UserSchema');

const UserModel=mongoose.model('User', UserSchema);
module.exports=UserModel;