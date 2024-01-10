const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
const cloudinary=require('./clodinary')

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}



//middlewares

dotenv.config()
app.use(express.json())
// app.use("/images",express.static(path.join(__dirname,"/images")))
<<<<<<< HEAD
app.use(cors());
app.use(express.static(path.join(__dirname,"./frontend/dist")))
// app.get("*",function(_,res){
//     res.sendFile(path.join(__dirname,"./frontend/dist/index.html"),function(err){
//         res.status(500).send(err)
//     })
// })
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   })
=======
app.use(cors({origin:"https://blogapp-nu-seven.vercel.app/",credentials:true}))
>>>>>>> 6e7a154fe94489c560e3097800ec1bb4d6ceef37
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),async(req,res)=>{
    const upload=await cloudinary.uploader.upload(req.file.path);
    res.status(200).json(upload.secure_url)
})


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})
