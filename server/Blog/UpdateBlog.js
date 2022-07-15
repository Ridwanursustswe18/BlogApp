const dbConnection = require("./../database/dbConnection");
const validator = require('fastest-validator');
exports.updateBlog = async(req,res)=>{
    const user = req.user;
    
    const id = req.params.id;
    const Blog = req.body;
    const Blogs = {
      title:req.body.title,
      description:req.body.description
      
   }
   const schema = {
     title:{type:"string",optional:true,max:100},
     description:{type:"string",optional:true,max:500}
   }
  const check = new validator();
  const validationResponse = check.validate(Blogs,schema);
    if(validationResponse !== true){
      return res.status(400).json({
        message:"validation failed",
        errors:validationResponse
   })
 }
  let query1 = "select * from blog_tbl where blog_tbl.ID = ?"
  dbConnection.query(query1,[id],(err,results)=>{
    
    if(results && results[0].userID === user.userId ){
      let query2 = "UPDATE blog_tbl SET title=?,description=? WHERE ID=?";
    dbConnection.query(query2,[Blog.title,Blog.description,id],(err,results)=>{
        if(!err){
            if(results.affectedRows === 0){
                return res.status(404).json({message:"Blog does not exist"})
            }
          return res.status(200).json({message:"Blog updated successfully"})
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