const express = require('express');
const router = express.Router();
const {updateUser, deleteUser, getUser, getAll } = require('../controllers/userController');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// router.get("/checkauthentication",verifyToken,(req,res,next) => {
//     res.send("hello user, you are logged in");
// });

// router.get("/checkuser/:id",verifyUser, (req,res,next) => {
//     res.send("Hello user, you are logged in and you can delete account");
// })

// router.get("/checkadmin/:id",verifyAdmin, (req,res,next) => {
//     res.send("Hello admin, you are logged in and you can all account");
// })

//UPDATE
router.put("/:id",verifyUser,updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUser);

//GET ALL
router.get("/",verifyAdmin,getAll);

module.exports = router;