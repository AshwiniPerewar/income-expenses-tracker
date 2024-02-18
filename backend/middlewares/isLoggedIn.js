const appErr = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const { verifyToken } = require("../utils/token");

const isLoggedIn = (req,res,next) => {
    console.log(req)
    // get token from request header
    const token = getTokenFromHeader(req);
    // verify token 
    const userDecoded = verifyToken(token);
    // save use id into req
    req.user = userDecoded.id; 

    if (!userDecoded)
        return (next(appErr("Invalid/Expired token,Please Login again", 401)));
    next();
}


module.exports = isLoggedIn;