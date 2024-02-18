const express = require("express");
const { fetchTransactionsCntrl, fetchSingleTransactionCntrl, createTransactionCntrl, updateTransactionCntrl, deleteTransactionCntrl } = require("../controllers/transactionCntrl");
const transactionRoute = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

// create new Transaction
transactionRoute.post("/",isLoggedIn,createTransactionCntrl)

// fetching all Transactions
transactionRoute.get("/", fetchTransactionsCntrl);

// fetching Transaction by id
transactionRoute.get("/:id", fetchSingleTransactionCntrl);

// updating Transaction by id
transactionRoute.patch("/:id", updateTransactionCntrl);

// fetching Transaction by id
transactionRoute.delete("/:id", deleteTransactionCntrl);


module.exports = transactionRoute;