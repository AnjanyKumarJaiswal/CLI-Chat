import passport  from 'passport'
import { Strategy as GoogleStrategy} from 'passport-google-oauth2'
import env from '../config/env.config.js'
import { User } from '../../models/chat.schema.js'



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
}, async function(request , accessToken, refreshToken, profile, done){
        try{
            let user = await  User.findOne({googleId: profile.id})
            if(!user){
                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    displayName: profile.displayName,
                    picture: profile.photos[0].value
                })
                await user.save()
            } 
            return done(null,user)
        } catch(err){
            return done(err,null)
        }
    }
))

passport.serializeUser(function(user,done) {
    done(null,user._id)
})

passport.deserializeUser(async function(id,done) {
    try{
        const user = await User.findById(id);
        done(null,user)
    } catch(err){
        return done(err,null)
    }
})