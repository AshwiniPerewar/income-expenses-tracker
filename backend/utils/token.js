const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign(
        { id},
        process.env.PRIMARY_SECRET_KEY,
        {
            expiresIn:"1h"
        }
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.PRIMARY_SECRET_KEY, (error, decoded) => {
        if (error)
            return false;
        else
            return decoded;
    })
}


module.exports = { generateToken, verifyToken }