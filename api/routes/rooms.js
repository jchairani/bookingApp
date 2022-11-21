const express = require('express');
const { createRoom, updateRoom,deleteRoom,getRoom, getAll, updateRoomAvailability } = require('../controllers/roomController');
const {verifyAdmin} = require('../utils/verifyToken');
const createError = require('../utils/error')


const router = express.Router();

//CREATE
router.post('/:hotelid',verifyAdmin,createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id",updateRoomAvailability);
//DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);

//GET
router.get("/:id",getRoom);

//GET ALL
router.get("/",getAll);

module.exports = router;