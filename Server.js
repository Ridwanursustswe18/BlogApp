const express = require("express");
require("dotenv").config();
const expressValidator = require('express-validator')
const memoryCache = require("./Cache/MeomryCaching")
const VerifyToken = require("./TokenValidation/validationMiddleware")
const DeleteBlog = require("./Blog/DeleteBlog");
const UpdateBlog = require("./Blog/UpdateBlog") 
const ReadBlog = require("./Blog/ReadBlog")
const CreateBlog = require("./Blog/CreateBlog")
const loginRoutes = require("./register/register")
const bodyparser = require("body-parser");
const dbConnection = require("./database/dbConnection");
const UpdateProfile = require("./UpdateUser/UpdateProfile")
const { register } = require("./register/register");
const login = require("./Login/login");
const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(express.json())



app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get("/",(req,res)=>{
    res.send("Welcome to home Page")
});
app.get("/read",memoryCache.cache(100),ReadBlog.readBlog);
app.post("/create",VerifyToken.verifyToken,CreateBlog.createBlog)
app.patch("/update/:id",VerifyToken.verifyToken,UpdateBlog.updateBlog);
app.delete("/delete/:id",VerifyToken.verifyToken,DeleteBlog.deleteBlog);

app.post("/register",loginRoutes.register)
app.post("/login",login.login)
app.patch("/updateUser/:id",VerifyToken.verifyToken,UpdateProfile.updateProfileInfo);


app.listen(3000);