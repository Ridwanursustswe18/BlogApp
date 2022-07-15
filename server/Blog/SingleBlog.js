const dbConnection = require("./../database/dbConnection");
exports.singleBlog = async(req,res)=>{
    const user = req.user;
    const id = req.params.id;
    let query1 = "select * from blog_tbl where blog_tbl.ID = ?"
    dbConnection.query(query1,[id],(err,results)=>{
    if(results && results[0].userID === user.userId ){
    let query2 = "SELECT title,description FROM  blog_tbl where ID = ? ";
    dbConnection.query(query2,[id],(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })
    }
    else{
        return res.status(403).json({message:"Unauthorized"})
    }
})
}