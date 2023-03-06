const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    estimatedReadTime: {
        type: String
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    articleImage: {},
    articleBasedOnQuestion: {
        question: String,
        options: [],
        answer: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const article = mongoose.model("article", articleSchema)
module.exports = article




