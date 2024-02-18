const Transaction = require("../models/Transaction");
const appErr = require("../utils/appErr");
const Account = require("../models/Account");
const User = require("../models/User");
// creating a new Transaction
const createTransactionCntrl = async (req, res, next) => {
  try {
    const { name, transactionType, amount, category, date, notes,account } =
      req.body;
    
    const userFound = await User.findById(req.user);
    if (!userFound) return next(appErr("User Not Found", 404));

    const accountFound = await Account.findById(account);
    if (!accountFound) return next(appErr("Account Not Found", 404));
    //   create a Transaction
    const newTransaction = new Transaction({
      name,
      transactionType,
      amount,
      category,
      createdBy: req.user,
      date,
      notes,
    });
    await newTransaction.save();
    
    // push transaction id into Account Collection
    await Account.findByIdAndUpdate(account, {
      $push: { transactions: newTransaction._id },
    });

    res.send({
      status:"success",
      message: "New Transaction Created Successfully",
      newTransaction,
    });
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// fetching all Transactions
const fetchTransactionsCntrl = async (req, res, next) => {
  try {
    const Transactions = await Transaction.find({});
    res.send({
      message: "Transaction Details fetched Successfully",
      Transactions,
    });
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// fetch single Transaction
const fetchSingleTransactionCntrl = async (req, res, next) => {
  try {
    const Transaction = await Transaction.findById(req.params.id);
    res.send({
      message: "Transaction Details fetched Successfully",
      Transaction,
    });
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// update Transaction
const updateTransactionCntrl = async (req, res, next) => {
  try {
    const { name, transactionType, amount, category, createdBy, date, notes } =
      req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        name,
        TextransactionType,
        amount,
        category,
        createdBy:req.user,
        date,
        notes,
      }
    );
    res.send({
      message: "Transaction Details updated Successfully",
      updatedTransaction,
    });
  } catch (error) {
    next(appErr(error.message,500));
  }
};

// delete Transaction
const deleteTransactionCntrl = async (req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.send({ message: "Transaction Deleted Successfully" });
  } catch (error) {
    next(appErr(error.message,500));
  }
};

module.exports = {
  createTransactionCntrl,
  fetchSingleTransactionCntrl,
  fetchTransactionsCntrl,
  updateTransactionCntrl,
  deleteTransactionCntrl,
};
