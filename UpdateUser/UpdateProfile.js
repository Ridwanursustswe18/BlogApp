const dbConnection = require("./../database/dbConnection");
const validator = require('fastest-validator');
exports.updateProfileInfo = async(req,res)=>{
    const id = req.params.id;
    const user = req.body;
    const users = {
      "Name":req.body.Name,
      "Email":req.body.Email,
      "UserName":req.body.UserName,
      "Password":req.body.Password,
      
      
   }
   const schema = {
     "Name":{type:"string",optional:false,min:3,max:50},
     "Email":{type:"string",optional:false,max:50},
     "UserName":{type:"string",optional:false,max:50},
    
   }
   const check = new validator();
   const validationResponse = check.validate(users,schema);
   if(validationResponse !== true){
     return res.status(400).json({
       message:"validation failed",
       errors:validationResponse
     })
   }
    let query = "UPDATE userregistration_tbl SET Name=?,Email=?,UserName = ?,Password = ? WHERE ID=?";
    dbConnection.query(query,[user.Name,user.Email,user.UserName,user.Password,id],(err,results)=>{
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
