const validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const { query } = require('express');
const dbConnection = require("./../database/dbConnection");

exports.Profile = async (req,res)=>{
  const id = req.params.id;
  const profileName = req.params.profileName;
  const profile = req.user;
  let query1 = "select * from userregistration_tbl where ID = ?"
  dbConnection.query(query1,[id],(err,results)=>{
    
    if(results && results[0].ID === profile.userId ){
      
      let query2 = "SELECT userregistration_tbl.Name,userregistration_tbl.Email,userregistration_tbl.UserName,userregistration_tbl.Password FROM userregistration_tbl WHERE ID = ?"
      dbConnection.query(query2,[id],(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })
    }
     
     
    })
       
    }
