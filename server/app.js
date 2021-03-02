const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

let sessionOptions = session({
    secret: "secret",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24, httpOnly: true}
})

const app = express()

app.use(sessionOptions)


app.use(cors({
    origin: [
        'http://localhost:8081'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const router = require('./router')

app.use('/', router)



module.exports = app