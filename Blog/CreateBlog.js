const { query } = require('express');
const validator = require('fastest-validator');
const dbConnection = require("../database/dbConnection");

exports.createBlog = async (req,res)=>{
    
    
    const Blogs = {
        title:req.body.title,
        description:req.body.description
        
     }
     const schema = {
       title:{type:"string",optional:false,max:100},
       description:{type:"string",optional:false,max:500}
     }
    const check = new validator();
    const validationResponse = check.validate(Blogs,schema);
      if(validationResponse !== true){
        return res.status(400).json({
          message:"validation failed",
          errors:validationResponse
     })
   }

     let query = "insert into blog_tbl(title,description) values (?,?)"
     dbConnection.query(query,[Blogs.title,Blogs.description],(err,results)=>{
       if(!err){
         return res.status(200).json({message:"blog added succesfully"})
       }
       else{
         return res.status(500).json(err)
       }
     })
       
    }
