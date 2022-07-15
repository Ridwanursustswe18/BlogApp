const dbConnection = require("./../database/dbConnection");
exports.readBlog = async(req,res)=>{
    let query = "SELECT ID,title,description FROM  blog_tbl ";
   
    
    dbConnection.query(query,(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })
}