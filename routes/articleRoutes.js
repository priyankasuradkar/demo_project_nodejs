const express = require('express')
const route = express.Router();

const {
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
    uploadImage,
    upload
} = require('../contoller/articleController')

route.post('/createarticle', createArticle)
route.post('/updatedarticle', updateArticle)
route.post('/deletearticle', deleteArticle)
route.post('/likearticle', likeArticle)
route.post('uplaodimge', upload.single("file"), uploadImage)

