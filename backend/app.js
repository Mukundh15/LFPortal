if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const port=process.env.PORT;
const mongoose=require('mongoose');
const UserModel=require('./models/UserModel');
const CardsModel=require('./models/CardsModel');
const SupportModel=require('./models/SupportModel');
const FeedbackModel=require('./models/FeedbackModel');
const multer=require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');
const bcrypt=require('bcrypt');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cron = require('node-cron');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const saltRounds=parseInt(process.env.SALTROUNDS);;

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
app.set("trust proxy", 1);
const allowedOrigins=[
  "https://lfportal.netlify.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)) {
      return callback(null, true);
    }else{
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DBUrl,
    }),
    cookie: {
        maxAge: 3000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}));

app.use(express.json());

cron.schedule('0 0 * * *', async () => {
  const cutoffDate=new Date();
  cutoffDate.setDate(cutoffDate.getDate()-14);
  try{
    await CardsModel.deleteMany({date:{$lt:cutoffDate}});
  }catch(err){
    console.error("Error in cron job:",err);
  }
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'LFPortal',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});
const upload = multer({ storage: storage });

async function main(){
  try {
    await mongoose.connect(process.env.DBUrl);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}
main();

app.post("/LFPortal",upload.single('image'),async(req,res)=>{
    const {name,userid,productName,description,item}=req.body;
    const imageUrl=req.file?req.file.path:null;
    const newCard=new CardsModel({
        name,
        nameid:userid,
        productName,
        productDiscription:description,
        item:item,
        image:imageUrl,
        date:new Date()
    })
    try {
        await newCard.save();
        res.status(201).json({
            message: "Form submitted successfully",
            card: newCard
        });
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
})

app.get("/LFPortal/cards",async(req,res)=>{
    try {
        const data = await CardsModel.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cards", error: err.message });
    }
})

app.get("/LFPortal/cardData",isAuthenticated,async(req,res)=>{
    try{
        const id=req.query.id;
        const data=await CardsModel.findById(id);
        res.json(data);
    }catch(err){
        res.status(401).json("There is a problem Occured");
    }
})

app.delete("/LFPortal",async(req,res)=>{
  try {
    const id=req.query.id;
    const deleted=await CardsModel.findByIdAndDelete(id);
    if(!deleted){
      return res.status(404).json({ message: "Card not found"});
    }
    res.status(200).json({message:"Card deleted successfully"});
  } catch(err){
    res.status(500).json({message:"Failed to delete card",error:err.message });
  }
});


app.post("/LFPortal/Support", isAuthenticated,async(req,res)=>{
    try{
        const {Name,Email,Description}=req.body;
        const newSupport=new SupportModel({
            name:Name,
            email:Email,
            problem:Description
        })
        await newSupport.save();
        res.status(201).json({ success: true,message: "Support request submitted" });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: true,message: "Server error", error: err.message });
    }
})

app.post("/LFPortal/Feedback", isAuthenticated,async(req,res)=>{
    try{
        const {Name,Email,Rating,Description}=req.body;
        const Feedback=new FeedbackModel({
            Name:Name,
            Email:Email,
            Rating:Rating,
            Description:Description
        })
        await Feedback.save();
        res.status(201).json({ message: "Feedback submitted" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

app.post('/LFPortal/Signup',async(req,res)=>{
    try{
        const {Name,Email,Password,PhoneNumber}=req.body;
        const existingUser = await UserModel.findOne({ email: Email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }
        const hashedPassword=await bcrypt.hash(Password,saltRounds);
        const User=new UserModel({
            name: Name,
            email:Email,
            password:hashedPassword ,
            phone:PhoneNumber 
        })
        await User.save();
        req.session.user={
            id: User._id,
            name: User.name,
            email: User.email,
        }
        res.status(201).json({message:"Signup successfully"});
    }catch(err){
        res.status(500).json({message:"Signup Unsuccessfully"});
    }
})

app.post("/LFPortal/Login",async(req,res)=>{
    try{
        const {Email,Password}=req.body;
        const user = await UserModel.findOne({ email: Email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(Password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({ message: "Login successful", id:user._id, user: user.name });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

app.get("/LFPortal/Profile", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome!", user: req.session.user });
});

app.get("/LFPortal/Logout",(req,res)=>{
    req.session.destroy(err => {
        if (err) return res.status(500).json({message: "Logout failed"});
        res.clearCookie("connect.sid");
        res.json({ message: "Logout successful" });
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Unknown Error Occured.." });
});

app.listen(port,'0.0.0.0',()=>{
    console.log("App Started on port "+port);
})