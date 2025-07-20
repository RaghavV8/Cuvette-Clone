const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    status:{
        type: String,
        enum: ["pending","accepted", "rejected"],
        default: "pending",
    },
},{timestamps:true});

module.exports = mongoose.model("Application", applicationSchema);