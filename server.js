import Express from "express"
import {Server} from "socket.io"
import path from "path"
import http from "http"
import SocketLogic from './server/socket.js'
import * as env from "./server/middleware/config/env.config.js"
import * as auth from './server/middleware/auth/authentication.js'
import passport from 'passport'
import { isLoggedIn , isLoggedOut } from "./server/middleware/utils/loggedin.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import ConnectMongoDB from "./server/database/db.js"
import { Chat , User } from "./server/models/chat.schema.js"


const app = Express();
const server = http.createServer(app)
const io = new Server(server)

SocketLogic(io)

app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 24 * 60 * 60 
    })
}))
app.use(passport.initialize())
app.use(passport.session())

ConnectMongoDB(process.env.MONGODB_URI)


app.get("/",(req,res)=>{
    return res
    .status(200)
    .sendFile(path.resolve('public','login.html'))
})

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email','profile']})
)

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/chat',
        failureRedirect: '/auth/failure',
    })
)

app.get('/auth/failure',(req,res)=>{
    res
    .status(404)
    .send({"Error Message":"An Error Occured While logging in"})
})

app.get("/chat", isLoggedIn , async (req,res)=>{
    try {
        const user = req.user; // Get the authenticated user from Passport.js
        const userId = user._id; // Get the MongoDB _id of the user

        // Find or create a chat room (you'll need to implement this logic)
        // Example: find the chat room associated with the user
        let chat = await Chat.findOne({ user: userId }); 

        if (!chat) { 
            // Create a new chat room for the user
            chat = new Chat({ user: userId }); // Or any other chat room creation logic
            await chat.save();
        }

        // Render index.html with user and chat data
        res.render('index.ejs', { user: user, chat: chat }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
    // res
    // .status(200)
    // .sendFile(path.resolve('public' , 'index.html'))
})

app.use(Express.static(path.resolve("./public")))


const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`The Server is Listening at http://localhost:${PORT}`)
})
