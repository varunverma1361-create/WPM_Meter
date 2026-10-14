const express = require("express");
const app = express();
app.use(express.json());
//
const cors = require("cors");
app.use(cors());
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
//

// app.use((req, res, next)=>{
//     req.myname = 'V';
//     next();
// })

app.get("/health", (req,res)=>{
    res.json({
        message: "server is working"
    })
});

//
connectDB();
//

const port = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
});