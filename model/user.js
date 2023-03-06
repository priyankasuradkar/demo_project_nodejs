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
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    accountStatus: {
        type: String,
        default: "PENDING"
    },
    sessionToken: { //for the vrification of token
        type: String,
    },
    leaf: {
        totalLeaf: {
            type: Number,
            default: 0
        },
        lastMineLeaf: {
            type: Number
        }
    },
    leafMiningTime: {
        type: String
    },
    notifications: [],
    circle: [],
    savedArticles: [],
    likedArticles: []
})
const user = new mongoose.model("user", userSchema)
module.exports = user;