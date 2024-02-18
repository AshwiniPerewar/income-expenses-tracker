const express = require("express");
const { createUserCntrl, fetchUsersCntrl, userProfileCntrl, updateUserCntrl, deleteUserCntrl, loginUserCntrl } = require("../controllers/userCntrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userRoute = express.Router();

// create new user
userRoute.post("/register",createUserCntrl)

// user login
userRoute.post("/login",loginUserCntrl)

// fetching all users
userRoute.get("/", fetchUsersCntrl);

// fetching user by id
userRoute.get("/",isLoggedIn,userProfileCntrl);

// updating user by id
userRoute.patch("/",isLoggedIn,  updateUserCntrl);

// fetching user by id
userRoute.delete("/",isLoggedIn, deleteUserCntrl);


module.exports = userRoute;