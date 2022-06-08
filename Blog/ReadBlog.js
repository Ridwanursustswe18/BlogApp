const dbConnection = require("./../database/dbConnection");
exports.readBlog = async(req,res)=>{
    let query = "SELECT userregistration_tbl.ID,userregistration_tbl.Name,userregistration_tbl.UserName,blog_tbl.title,blog_tbl.description  FROM userregistration_tbl INNER JOIN blog_tbl ON userregistration_tbl.ID = blog_tbl.userID";
   
    
    dbConnection.query(query,(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })
}