const express = require('express')
const app = express()
const PORT = 8000
const userRoutes = require('./routes/userRoutes')
require('./repo/mongoDBConfig')

app.use(express.json())
app.use(userRoutes)

app.listen(PORT, () => {
    console.log('Server is Running on port 8000');
})