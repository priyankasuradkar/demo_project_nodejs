//create article API

const article = require("../model/article")

const createArticle = async (req, res) => {
    try {
        const { email, title, articleDescription, estimatedReadTime } = req.body
        articleImage = req.file
        const isUserExists = await user.findOne({ email: email }).lean()
        if (!isUserExists) {
            return res.status(403).json({ err: "User not exists!!" })
        }
        ///mobile verfication 
        const articleObject = {
            email,
            articleImage,
            title,
            articleDescription,
            estimatedReadTime
        }

        const createArticleData = new article(articleObject)
        const isArticleSaved = createArticleData.save()

        if (!isArticleSaved) {
            return res.status(404).json({ err: "user not saved!!" })
        }

        const notification = {
            email,
            notificationTime: moment(),
            title,
            description
        }

        isUserExists.circle.forEach(async (element) => {
            await article.updateOne({ email: email }, {
                $push: {
                    notification: notification
                }
            })
        });

        return res.status(200).json(articleObject)
    }
    catch (err) {
        return res.status(403).json({ err: "internal server error" })
    }
}

///update article//
const updateArticle = async (req, res) => {
    try {
        const { title, description, estimatedReadTime, articleBasedOnQuestion, articleID } = req.body
        const articleImage = req.file
        const email = req.article.file

        const isArticleExists = await article.findOne({ email: email }).lean()
        if (!isArticleExists)
            return res.status(404).json({ err: "User not found" })

        const articleObject = {}

        if (articleImage)
            articleObject["articleImage"] = articleImage

        if (title)
            articleObject["title"] = title

        if (description)
            articleObject["description"] = description

        if (estimatedReadTime)
            articleObject["estimatedReadTime"] = estimatedReadTime

        if (articleBasedOnQuestion)
            articleObject["articleBasedOnQuestion"] = articleBasedOnQuestion

        if (Object.keys(setParams).length > 0) {
            await article.updateOne({ email }, {
                $set: {
                    articleObject
                }
            })
        }

        const updatedArticleData = await article.findById(articleID).lean() //saving updated data in the 
        //updatedarticleData 
        return res.status(200).json(updatedArticleData)
    }
    catch (err) {
        return res.status(404).json({ err: "Internal server error" })
    }
}

//delete API
const deleteArticle = async (req, res) => {
    try {
        const { articleId } = req.body
        const isArticleExists = await article.findById({ "id": articleId })

        if (!isArticleExists)
            return res.status(403).json({ err: "article does not exists!!" })

        const deletedArticle = await article.deleteOne(isArticleExists)
        if (!deletedArticle)
            return res.status(200).json({ success: "article deleted succesfully!!" })

    }
    catch {
        return res.status({ err: "error" })
    }
}

//Likes API
const likeArticle = async (req, res) => {
    try {
        const { articleID } = req.body
        // const isUserExists = await user.findOne({ email: email })
        // if (isUserExists)
        //     return res.status(403).json({ err: "User not found!!" })

        const isArticleExists = await article.findById({ "id": articleID })
        if (!isArticleExists)
            return res.status(403).json({ err: "Article not found!!" })

        await article.updateOne({ "id": articleID }, {
            $set: {
                totalLikes: isArticleExists.totalLikes + 1
            }
        })

        // await user.updateOne({ email: email }, {
        //     $push: {
        //         likedArticle: articleID
        //     }
        // })

        const updatedArticleData = await user.findById(articleID).lean()
        return res.status(200).json(updatedArticleData)
    }
    catch (err) {
        return res.status(404).json({ err: err })
    }
}

//trending API
const trendingArticle = async (req, res) => {
    try {
        const { articleID } = req.body
        const email = file.user.email

        const isArticleExists = await (req, res)
        if (!isArticleExists)
            return res.status(403).json({ err: "user does not exists!!" })

        const allArticles = await article.find().lean()//?
        const sortedTrendingArticles = allArticles.sort((a, b) => {
            b.totalLikes - a.totalLikes
        })

        const updatedArticles = sortedTrendingArticles.filter((element, index) => {
            if (index < 3)
                return element;
        })

        return res.status(200).json(updatedArticles)

    }
    catch (error) {
        return res.status(500).json({ error: err })
    }
}

//unlike Articles
const unlikeArticle = async (req, res) => {
    const { articleID } = req.body
    const isArticleExists = await article.findById({ id: articleID }).lean()

    if (!isArticleExists)
        return res.status(403).json({ err: "article does not exists!!!" })

    await article.updateOne({ id: articleID }, {
        $set: {
            totalLikes: isArticleExists.totalLikes - 1
        }
    })


}
const uploadImage = (req, res) => {
    const file = req.file;

    console.log('FILE', file);
}

const storage = multer.diskStorage({
    destination: "/var/www/html",
    filename: (req, file, cb) => {
        try {
            return cb(
                null,
                `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
            );
        } catch (err) {
            console.log("ERROR OR ", err);
        }
    },
});

const upload = multer({
    storage,
});

moodule.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
    unlikeArticle,
    trendingArticle,
    uploadImage,
    upload
}

