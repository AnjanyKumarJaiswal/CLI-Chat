import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String },
    picture: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: null},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    log: [
        {   by: { type:mongoose.Schema.Types.ObjectId, ref: 'User'},
            sent:{ type: Date, default: Date.now },
            message: String
        }
    ],
    createdAt:{ type: Date, default: Date.now },
    upDatedAt: Date
})

export const User = mongoose.model('User', userSchema)
export const Chat = mongoose.model('Chat',chatSchema)
