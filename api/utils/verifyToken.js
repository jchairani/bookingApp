const jwt = require('jsonwebtoken');
const createError = require('../utils/error');

module.exports.verifyToken = async(req,res,next) => {
    const token = req.cookies.access_token;
    
    if(!token) return next(createError(401,"You are not authenticated"));

    //check token
    jwt.verify(token,process.env.JWT, (err,user)=>{
        if(err) return next(createError(403,"Token invalid"));
        console.log(user);
        req.user = user;
        
        next()
    });
}

module.exports.verifyUser = (req,res,next) => {
    this.verifyToken(req,res,next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized"));
        }
    })
}

module.exports.verifyAdmin = (req,res,next) => {
    this.verifyToken(req,res,next, () => {
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized"));
        }
    })
}