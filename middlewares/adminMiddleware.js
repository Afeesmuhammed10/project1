const jwt = require('jsonwebtoken')



const adminAuth = (req,res,next)=>{
    const token = req.cookies.admintoken

    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
            if(err){
                res.status(404);
               
                res.redirect('/admin/login')
            }else{
                console.log(decode)
                req.admin = decode
              
            }
        })
        next()
    }else{
        res.redirect('/admin/login')
        console.log("error")
    }
}

module.exports = {
    adminAuth
}