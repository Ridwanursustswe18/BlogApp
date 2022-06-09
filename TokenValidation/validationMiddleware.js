const{verify} = require("jsonwebtoken");
exports.verifyToken = async(req,res,next)=>{
    let token = req.get("authorization")
    if(token){
        token = token.slice(7)
        verify(token,"secret",(err,decoded)=>{
            
            if(err){
                res.status(401).json({
                    message:"Invalid token"
                })
            }
            
            else{
                req.user = decoded;
                next();
            }
        })
    }
    else{
        res.status(403).json({
            message:"Access denied unauthorized user"
        })
    }
}