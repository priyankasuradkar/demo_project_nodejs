const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    countryCode: {
        type: String,
        required: true
    },
    verificationCode: {
        type: Number,
    }


})
const user = new mongoose.model("user", userSchema)
module.exports = user;