const validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const { query } = require('express');
const dbConnection = require("./../database/dbConnection");

exports.register = async (req,res)=>{
    const password = req.body.Password;
    const salt  = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    
    
    const users = {
        "Name":req.body.Name,
        "Email":req.body.Email,
        "UserName":req.body.UserName,
        "Password":req.body.Password,
        "HashPassword":hashedPassword
        
     }
     const schema = {
       "Name":{type:"string",optional:false,min:3,max:50},
       "Email":{type:"string",optional:false,max:50},
       "UserName":{type:"string",optional:false,max:50},
       "Password":{type:"string",optional:false,min:7}
     }
     const check = new validator();
     const validationResponse = check.validate(users,schema);
     if(validationResponse !== true){
       return res.status(400).json({
         message:"validation failed",
         errors:validationResponse
       })
     }

     let query = "insert into userregistration_tbl(Name,Email,UserName,Password) values (?,?,?,?)"
     dbConnection.query(query,[users.Name,users.Email,users.UserName,users.HashPassword],(err,results)=>{
       if(!err){
         return res.status(200).json({message:"User added succesfully"})
       }
       else{
         return res.status(500).json(err)
       }
     })
       
    }
