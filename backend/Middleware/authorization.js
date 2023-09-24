const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>
{
    const  token=req.headers.token
   
    jwt.verify(token, 'auth', function(err, decoded) {
        if(err)
        {
            res.send("Please Login")
        }
        else
        {
            req.body.id=decoded.id
            next()
        }

         
      });

}

module.exports=auth