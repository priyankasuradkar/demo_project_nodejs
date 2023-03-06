const express = require('express')
const route = express.Router();

const {
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
} = require('../contoller/articleController')

route.post('/createarticle', createArticle)
route.post('/updatedarticle', updateArticle)
route.post('/deletearticle', deleteArticle)
route.post('/likearticle', likeArticle)
route.post('')
