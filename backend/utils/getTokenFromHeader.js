const getTokenFromHeader = (req) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    if (token == undefined)
        return { status: "failed", message: "Please Attach token to header" };
    else
        return token;

}

module.exports=getTokenFromHeader