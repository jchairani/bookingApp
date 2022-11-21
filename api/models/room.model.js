const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    roomNumber: [{number:Number, unavailableDates:{type: [Date]}}],
},{
    timestamps: true
});
module.exports = mongoose.model('Room',RoomSchema);