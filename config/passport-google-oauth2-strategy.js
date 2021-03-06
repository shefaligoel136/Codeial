const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = require('./environment');
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new google strategy for login
// passport.use(new googleStrategy({
//         clientID: "409261034159-mj8q59t25nfgnj95h7iipftn20u1tcm8.apps.googleusercontent.com",
//         clientSecret: "mVQeQhJ9SRj0SqsdoTrg8erk",
//         callbackURL: "http://localhost:8000/users/auth/google/callback" // this call back will be matched from one with the google
//     },
    
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url // this call back will be matched from one with the google
},

    function(accessToken, refreshToken, profile, done){ // profile will contain users information, we are going to match user with the email in DB
        
        // find user
        User.findOne({
            email: profile.emails[0].value // a user can have multiple emails on google and so google will show all, emails is array hence [0] used
        }).exec(function(err, user){
            if(err){
                console.log("Error in google strategy passport", err);
                return;
            }
            console.log(profile);

            if(user){

                // if found set the user as *request.user* -> signin the user
                return done(null,user);
            }else{
                User.create({

                    // if not found, create a user and set it as *request.user* -> signin the user
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') // generation of password while signing up.
                }, function(err,user){
                    if(err){
                        console.log("Error in creating user in google strategy passport", err);
                        return;
                    }   
                    return done(null,user);
                })
            }
        })
    }
    

));


module.exports = passport;