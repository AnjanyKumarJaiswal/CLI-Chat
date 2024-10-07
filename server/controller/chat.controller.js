import { User , Chat } from "../models/chat.schema";

export async function disPlayUserChats(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/').status(401)
    }
    const id = req.params.id
    const user = await User.findById(id)
    const messages = await Chat.findById(id).populate('log.by','displayName')
    if(messages == null){
        return {user: user.displayName}
    }
    res.render('chat',{messages, user: req.user})
}

export async function renderProfile(req,res,next) {
    if(!req.isAuthenticated()){
        return res.redirect('/').status(401)
    }
    const user = await User.findById(req.users.googleId)
    res.render('profile',{user})
}