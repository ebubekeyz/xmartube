require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')

const path = require('path');

const express = require('express');
const app = express();

const {authenticateUser} = require('./middleware/authentication2')


const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET
})


const cors = require('cors')

const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const uploadRouter = require('./routes/uploadRoutes')
const articleRouter = require('./routes/articleRoutes')
const viewsRouter = require('./routes/viewsRoutes')
const subscribeRouter = require('./routes/subscribeRoutes')
const chatRouter = require('./routes/chatRoutes')

const cookieParser = require('cookie-parser');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }))

app.use(express.static('./public'))

app.use(cors({credentials: true}));
// app.use((req, res, next) => {

//     res.header("Access-Control-Allow-Origin", "http://localhost:500")
//     res.header('Access-Control-Allow-Credentials', 'true')
//     res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, PATCH")
//     res.header("Accept-Language", "en, en")
//     res.header(
//         "Control-Security-Policy",
//         "default-src '*'; base-uri: ; '*'; strict-dynamic '*'; manifest-src '*'; script-src '*'; style-src '*'"
//     )
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, Csrf-Token, Accept-Language, Content-Type, Accept, Range, X-Ahoritagram-Mime, X-Ahoritagram-Type, X-Ahoritagram-User, X-Ahoritagram-Auth, X-Ahoritagram-License, X-Ahoritagram-Size, X-Ahoritagram-Platform, X-Ahoritagram-ProductSub"
//     )
   

//     next()
  
// })




app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/upload', uploadRouter)
app.use('/api/v1/article', articleRouter)
app.use('/api/v1/views', viewsRouter)
app.use('/api/v1/subscribe', subscribeRouter)
app.use('/api/v1/chat', chatRouter)


app.get('/test', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/test.html'))
})
app.get('/post-main', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/post-main.html'))
})
app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})
app.get('/chat', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/chat.html'))
})

app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/dashboard.html'))
})



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.port || 500

const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`SERVER IS LISTENING ON PORT ${port}`))
}

start()


