const express = require("express");
const app = express();
app.use(express.json());
//
const testRouter = require("./routes/test");
require("dotenv").config();
app.use("/test", testRouter);
//
const connectDB = require("./db");
//
const userRouter = require("./routes/users");
app.use("/users", userRouter);
//
const userTestResultRouter = require("./routes/results");
app.use("/results", userTestResultRouter);

app.use((req, res, next)=>{
    req.myname = 'V';
    next();
})

app.get("/health", (req,res)=>{
    res.json({
        message: "server is working"
    })
});

//
connectDB();
//
app.listen(3000, ()=>{
    console.log("server running on port 3000")
});