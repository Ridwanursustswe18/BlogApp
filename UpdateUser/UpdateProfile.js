const dbConnection = require("./../database/dbConnection");
const validator = require('fastest-validator');
exports.updateProfileInfo = async(req,res)=>{
    const id = req.params.id;
    const profile = req.user;
    const user = req.body;
    const users = {
      "Name":req.body.Name,
      "Email":req.body.Email,
      "UserName":req.body.UserName,
      "Password":req.body.Password,
      
      
   }
   const schema = {
     "Name":{type:"string",optional:true,min:3,max:50},
     "Email":{type:"string",optional:true,max:50},
     "UserName":{type:"string",optional:true,max:50},
    
   }
   const check = new validator();
   const validationResponse = check.validate(users,schema);
   if(validationResponse !== true){
     return res.status(400).json({
       message:"validation failed",
       errors:validationResponse
     })
   }
   let query1 = "select * from userregistration_tbl where ID = ?"
   dbConnection.query(query1,[id],(err,results)=>{
     console.log(results)
     if(results && results[0].ID === profile.userId ){
       let query2 = "UPDATE `userregistration_tbl` SET `Name`= ?,`Email`= ?,`UserName`=? WHERE ID=?";
     dbConnection.query(query2,[user.Name,user.Email,user.UserName,id],(err,results)=>{
         if(!err){
             if(results.affectedRows === 0){
                 return res.status(404).json({message:"User does not exist"})
             }
           return res.status(200).json({message:"User updated successfully"})
         }
         else{
           return res.status(500).json(err)
         }
       })
     }
     else{
       return res.status(400).json(err)
     }
   })
}
