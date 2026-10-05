const express = require("express");
const router = express.Router();

router.get("/test", (req,res)=>{
    res.json({
        message: "test route"
    })
})

router.post("/test", (req,res)=>{
    const {name} = req.body;
    res.json({
        message: `Hello ${req.myname}`
    })
})

module.exports = router;