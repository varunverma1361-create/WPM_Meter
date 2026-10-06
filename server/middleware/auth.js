const jwt = require("jsonwebtoken");

function auth(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; //jwt token se extracted userId ko req mei daal diya
        next();
    } catch(error){
        return res.status(401).json({
            message: "Invalid or missing token"
        })
    }
}

module.exports = auth;