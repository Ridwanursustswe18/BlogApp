let cache = require("memory-cache");
exports.cache = (duration)=>{
    return (req,res,next)=>{
        let key = '_express_'+req.originalUrl || req.url
        let cachedBody = cache.get(key)
        if(cachedBody){
            console.log(`cache hit for ${key}`)
            return res.send(cachedBody)
            
        }
        else{
            console.log(`cach miss for ${key}`)
            res.sendResponse = res.send;
            res.send = (body)=>{
                cache.put(key,body,duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}