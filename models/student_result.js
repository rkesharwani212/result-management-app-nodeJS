const mongoose = require("mongoose");

const studentResultSchema = new mongoose.Schema({
    rollno: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    dob: {
        type:Date,
        required: true
    },
    score: {
        type:Number,
        required: true
    }
})

module.exports = mongoose.model('StudentResults',studentResultSchema);