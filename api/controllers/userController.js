const User = require('../models/user.model');

module.exports.updateUser = async(req,res,next) => {
    try{
        //new true to show the new updated document
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new :true});
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

module.exports.deleteUser = async(req,res,next) => {
    try{
        //new true to show the new updated document
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new :true});
        res.status(200).json("User Deleted");
    }catch(err){
        next(err);
    }
}

module.exports.getUser = async(req,res,next) => {
    try{
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    }catch(err){
        next(err);
    }
}

module.exports.getAll = async(req,res,next) => {
    try{
        const getUser = await User.find();
        res.status(200).json(getUser);
    }catch(err){
        next(err);
    }
}

