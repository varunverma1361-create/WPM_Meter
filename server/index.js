const express = require("express");
const app = express();
const testRouter = require("./routes/test");
require("dotenv").config();
const connectDB = require("./db");

app.use(express.json());

app.use((req, res, next)=>{
    req.myname = 'V';
    next();
})

app.get("/health", (req,res)=>{
    res.json({
        message: "server is working"
    })
});

app.use("/test", testRouter);

connectDB();

app.listen(3000, ()=>{
    console.log("server running on port 3000")
});