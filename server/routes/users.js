const express = require("express");
const User = require("../models/User");

const bcrypt = require("bcrypt");

const router = express.Router();
//signup (user gets created, password hashed and stored in mongoDB)
router.post("/", async (req,res)=>{
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    

    try{
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = new User({
            name: userName,
            email: userEmail,
            password: hashedPassword,
        });

        await user.save();  //user create krne ke baad you have to save it in ur DB
        res.json({
        message: "User created"
        })
    } catch (error){
        return res.status(500).json({
            message: "An error occured"
        })
    }
    
});

router.post("/login", async (req,res)=>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    try{
        const user = await User.findOne({
            email: userEmail
        })

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.password);
        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        res.json({
            message: "Login successful"
        })
    } catch(error){
        res.status(500).json({
            message: "DB error occurred"
        })
    }
})

module.exports = router;