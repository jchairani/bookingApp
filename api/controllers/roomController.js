const Room = require('../models/room.model');
const Hotel = require('../models/hotel.model');
const createError = require('../utils/error');

module.exports.createRoom = async(req,res,next) => {
    const hotelid = req.params.hotelid;
    const newRoom = new Room(req.body);
    
    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelid, {$push : {rooms:savedRoom._id}});
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}

module.exports.updateRoom = async(req,res,next) => {
    try{
        //new true to show the new updated document
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new :true});
        res.status(200).json(updatedRoom);
    }catch(err){
        next(err);
    }
}

module.exports.updateRoomAvailability = async(req,res,next) => {
    try{
        await Room.updateOne({"roomNumber._id":req.params.id},{$push: {
            "roomNumber.$.unavailableDates": req.body.dates
        }})
        res.status(200).json("Room status has been updated");
    }catch(err){
        next(err);
    };
}

module.exports.deleteRoom = async(req,res,next) => {
    const hotelid = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelid, {$pull: {rooms: req.params.id}});
        }catch(err){
            next(err);
        }
        res.status(200).json("Room has been deleted");
    }catch(err){
        next(err);
    }
}

module.exports.getRoom = async(req,res,next) => {
    try{
        const myRoom = await Room.findById(req.params.id);
        res.status(200).json(myRoom);
    }catch(err){
        next(err);
    }
}

module.exports.getAll = async(req,res,next) => {
    try{
        const getAllRoom = await Room.find();
        res.status(200).json(getAllRoom);
    }catch(err){
        next(err);
    }
}