const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_key = process.env.JWT_KEY;

/* Middleware To Authenticate Logged In User */
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwt_key);
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: "Auth Failed"
        });
    }
};