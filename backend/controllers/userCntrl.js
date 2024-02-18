const globalErrHandler = require("../middlewares/globalErrHandler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const appErr = require("../utils/appErr");
const { generateToken,verifyToken } = require("../utils/token");
const isLoggedIn = require("../middlewares/isLoggedIn");

// creating a new user
const createUserCntrl = async (req, res, next) => {
  try {
    const { fullName, email, password ,hasCreatedAccount} = req.body;
    // check for empty fields
    if (!fullName || !email || !password)
      next(appErr("All Fields are required",400));
    else {
      // check if user already exist
      const userExist = await User.findOne({ email: email });
      if (userExist) next(appErr("User already registered with this email id",400));
      else {
        //   encrypt password
        const hash = await bcrypt.hash(password, 5);

        //   create a user
        const newUser = await User.create({ fullName, email, password: hash ,hasCreatedAccount});
        newUser.save();
        res.send({
          status: "success",
          message: "New User Created Successfully",
          newUser,
        });
      }
    }
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// login
const loginUserCntrl = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    // check for empty fields
    if (!email || !password)
      next(appErr("Please enter email and password",400));
    else {
      // check if user registered with the entered email
      const userFound = await User.findOne({ email: email });
      if (!userFound)  next(appErr("Invalid Credentials,400"));
      else {
        //   decrypt password
        const match = await bcrypt.compare(password, userFound.password);

        if (!match)  next(appErr("Invalid Credentials",400));
        else {
          const token = generateToken(userFound._id);
          res.send({
            status: "success",
            message: "Logged In Successfully",
            token
          });
        }
      }
    }
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// fetching all users
const fetchUsersCntrl = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('accounts');
    res.send({status:"success",  message: "User Details fetched Successfully", users });
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// fetch single user
const userProfileCntrl = async (req, res, next) => {
  try {
    const user = await User.findById( req.user);
      res.send({status:"success",  message: "User Details fetched Successfully", user });
   } catch (error) {
    next(appErr(error.message,500));
  }
};

// update user
const updateUserCntrl = async (req, res, next) => {
  try {
    const { fullName, email, password, hasAccountCreated } = req.body;
    const userFound = await User.findOne({ email });
    console.log(userFound)
    if (userFound) return next(appErr("Email already taken", 400));
    // if (password) {
    //   hash =await bcrypt.hash(password, 5);
    // }
    const updatedUser = await User.findByIdAndUpdate(req.user, {
      fullName,
      email,
      password:await bcrypt.hash(password, 5),
      hasAccountCreated,
    });
    res.send({status:"success", message: "User Details updated Successfully"});
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// delete user
const deleteUserCntrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.send({status:"success",  message: "User Deleted Successfully" });
  } catch (error) { next(appErr(error.message,500));
  }
};

module.exports = {
  createUserCntrl,
  loginUserCntrl,
  userProfileCntrl,
  fetchUsersCntrl,
  updateUserCntrl,
  deleteUserCntrl,
};
