const express = require("express");
const { fetchAccountsCntrl, fetchSingleAccountCntrl, createAccountCntrl, updateAccountCntrl, deleteAccountCntrl } = require("../controllers/accountCntrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const accountRoute = express.Router();

// create new Account
accountRoute.post("/",isLoggedIn,createAccountCntrl)

// fetching all Accounts
accountRoute.get("/", fetchAccountsCntrl);

// fetching Account by id
accountRoute.get("/:id", fetchSingleAccountCntrl);

// updating Account by id
accountRoute.patch("/:id", updateAccountCntrl);

// fetching Account by id
accountRoute.delete("/:id", deleteAccountCntrl);


module.exports = accountRoute;