const dbConnection = require("./../database/dbConnection");
exports.deleteBlog = async(req,res)=>{
    const id = req.params.id;
    
    let query = "DELETE FROM blog_tbl WHERE ID=?";
    dbConnection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows === 0){
                return res.status(404).json({message:"Blog does not exist"})
            }
          return res.status(200).json({message:"Blog deleted successfully"})
        }
        else{
          return res.status(500).json(err)
        }
      })
}