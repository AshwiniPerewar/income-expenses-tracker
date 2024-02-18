const globalErrHandler = (err, req, res, next) => {
    const message = err.message;
    const statusCode = err.statusCode || 500;
    const status = err.status || "failed";
    const stack = err.stack;
    res.status(statusCode).send({status,message,stack})
}

module.exports = globalErrHandler;