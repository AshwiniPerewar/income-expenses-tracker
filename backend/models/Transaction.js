const { Schema, model, default: mongoose } = require("mongoose");

// schema for Transaction
const transactionSchema = new Schema({
    name: { type: String, required: true },
   transactionType: { type: String, enum:["Income","Expenses"],required:true },
    amount: { type: Number, default: 0, required: true },
    category: {
        type: String, enum: ["Food", "Shopping", "Travel", "Medical", "Education", "Bills", "Groceries", "Transportation",
        "Entertainment","Utilities","Personal","Unrecognized"],required:true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date:{type:Date,default:Date.now()},
    notes:{type:String,required:true}
},
    {
        timestamps: true,
        toJSON:{virtuals:true}
    }
)
// {name,TransactionType,amount,category,createdBy,date,notes}
// creating collection for TransactionSchma
const Transaction =new model("Transaction", transactionSchema);

// exporting module
module.exports = Transaction;
