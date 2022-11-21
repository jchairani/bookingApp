const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const cors = require('cors');

const URI = process.env.MONGO;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Coonnected to MongoDB')
})


mongoose.connection.on("disconected", () => {
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB connceted");
})

app.get("/users",(req,res)=>{
    res.send("Hello");
})


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

//error handling middleware
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(8000,()=>{
    console.log("Listening to port 8000");
})