
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { query } = require('express');
const dbConnection = require("./../database/dbConnection");
exports.login = async (req,res)=>{
   const userName = req.body.UserName;
   const password = req.body.Password;
  
   
   
   dbConnection.query(`SELECT * FROM userregistration_tbl WHERE UserName  = ${dbConnection.escape(userName)} `,async(err,results)=>{
      
      if(err){
         return res.status(400).json(err)
      }
      // if(!results.length){
      //    return res.status(401).json({
      //       message:"username or password is incorrect"
      //    })
      // }
     
      bcrypt.compare(password,results[0]['Password'],(err,result)=>{
         if(err){
            return res.status(401).json({
               message:"username or password is incorrect"
            })
         }
         if(result){
            const token = jwt.sign({
               username:userName,
               userId:results[0].ID
            },"secret",{
               expiresIn:'7d'
            })
            
            return res.status(200).json({
               message:"Successfully logged in",
               token,
               user:results[0],
               userId:results[0].ID
            })
         }
        
         return res.status(401).json({
            message:"username or password is incorrect .."
         })
      }) 
 });

 }

