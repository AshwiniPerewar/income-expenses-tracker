const express = require('express');
const userRoute = require('./routes/userRoute');
const transactionRoute = require('./routes/transactionRoute');
const accountRoute = require('./routes/accountRoute');
const globalErrHandler = require('./middlewares/globalErrHandler');
require("dotenv").config();
const PORT=process.env.PORT
const app=express();
require("./config/dbConnect");


app.use(express.json());

// user route
app.use("/users", userRoute);

// transaction route
app.use("/transactions", transactionRoute);

// account route
app.use("/accounts",accountRoute)

// error handler
app.use(globalErrHandler)

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
});