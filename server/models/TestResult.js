const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    wpm: {
        type: Number,
        required: true
    },

    accuracy: {
        type: Number,
        required: true
    },

    timeTaken: {
        type: Number,
        required: true
    }
},

    {
        timestamps:true
});

const TestResult = mongoose.model("TestResult", TestResultSchema);

module.exports = TestResult;