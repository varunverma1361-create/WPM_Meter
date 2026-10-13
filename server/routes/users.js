const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const {signupSchema, loginSchema} = require("../schemas/userSchemas");

const bcrypt = require("bcrypt");

const router = express.Router();
//signup (user gets created, password hashed and stored in mongoDB then logs in user by creating and sending jwt token)
router.post("/", async (req,res)=>{

    const parsedData = signupSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            message: parsedData.error.issues[0].message
        })
    }

    const userName = parsedData.data.name;
    const userEmail = parsedData.data.email;
    const userPassword = parsedData.data.password;
    

    try{
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = new User({
            name: userName,
            email: userEmail,
            password: hashedPassword,
        });

        await user.save();  //user create krne ke baad you have to save it in ur DB

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.json({
            message: "User created",
            token
        })

    } catch (error){
        console.log(error);

        if(error.code === 11000){
            return res.status(409).json({
                message: "Account already exists"
            })
        }

        return res.status(500).json({
            message: "An error occured"
        })
    }
    
});
//login- first checks if user exists, if yes then generates a jwt token for them
router.post("/login", async (req,res)=>{

    const parsedData = loginSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            message: parsedData.error.issues[0].message
        });
    }

    const userEmail = parsedData.data.email;
    const userPassword = parsedData.data.password;

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

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            message: "Login successful",
            token
        })

    } catch(error){
        res.status(500).json({
            message: "DB error occurred",
        })
    }
})
//uses the auth middleware which verifies the jwt token
router.get("/profile", auth, async (req,res)=>{
    try{
        const userId = req.userId;
        const user = await User.findOne({
            _id : userId
        })

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.json({
            name: user.name,
            email: user.email
        })

    } catch(error){
        res.status(500).json({
            message: "Database error"
        })
    }
})

module.exports = router;