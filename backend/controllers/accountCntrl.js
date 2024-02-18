const Account = require("../models/Account");
const User = require("../models/User");
const appErr = require("../utils/appErr");

// creating a new Account
const createAccountCntrl = async (req, res,next) => {
    try {
      const userFound = await User.findById(req.user);
      if (!userFound)
        return next(appErr("User Not Found",404))
      
      //   create a Account
      const newAccount = await Account.create({ ...req.body,createdBy:req.user });
      newAccount.save();
      
      // push account id into User Collection
      await User.findByIdAndUpdate(req.user, { $push:{accounts:newAccount._id} });
      
      res.send({status:"success", message: "New Account Created Successfully", newAccount });
    } catch (error) {
       next(appErr(error.message,500));
  }
};

// fetching all Accounts
const fetchAccountsCntrl = async (req, res, next) => {
  try {
    const accounts = await Account.find().populate('transactions');
    // const result = await accounts.populate('transactions');
    // console.log(result)
    res.send({ message: "Account Details fetched Successfully", accounts });
  } catch (error) {
      next(appErr(error.message,500));
  }
};

// fetch single Account
const fetchSingleAccountCntrl = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id).populate({ path: 'transactions'
  });
    res.send({ message: "Account Details fetched Successfully", account });
  } catch (error) {
   next(appErr(error.message,500));
  }
};

// update Account
const updateAccountCntrl = async (req, res, next) => {
  try {
    //   const  {name,AccountType,amount,category,createdBy,date,notes} = req.body;
      
      const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Account Details updated Successfully", updatedAccount });
  } catch (error) {
   next(appErr(error.message,500));
  }
};

// delete Account
const deleteAccountCntrl = async (req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.send({ message: "Account Deleted Successfully" });
  } catch (error) {
   next(appErr(error.message,500));
  }
};

module.exports = {
  createAccountCntrl,
  fetchSingleAccountCntrl,
  fetchAccountsCntrl,
  updateAccountCntrl,
  deleteAccountCntrl,
};
