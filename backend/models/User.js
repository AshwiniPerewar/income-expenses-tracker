const { Schema, model, default: mongoose } = require("mongoose");

// schema for user
const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hasCreatedAccount: { type: Boolean, default: false },
    accounts: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
},
    {
        timestamps:true
    }
)

// creating collection for userSchma
const User =new model("User", userSchema);

// exporting module
module.exports = User;
