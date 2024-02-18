const { Schema, model, default: mongoose } = require("mongoose");

// schema for account
const accountSchema = new Schema({
    name: { type: String, required: true },
   accountType: { type: String, enum:["Savings","Joint","Current","Personal","Travel","Investment","Loan","Education","Home"],required:true },
    initialBalance: { type: Number,default:0},
    transactions: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
    notes:{type:String,required:true}
},
    {
        timestamps: true,
        toJSON:{virtuals:true}
    }
)

// creating collection for accountSchma
const Account =new model("Account", accountSchema);

// exporting module
module.exports = Account;
