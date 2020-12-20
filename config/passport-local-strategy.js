const { Strategy, use } = require('passport');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email,password,done){ // done is the callback function that is returning to passport.js

        // find a user and establish the identity
        User.findOne({
            email : email
        }, function(err,user)  {
            if(err){
                console.log("Error in finding user --> passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log("Invalid username or password");
                return done(null,false);  // done takes 2 arguments the first one is error, which is given the value null here.
            }

            return done(null,user);
        });
    }

));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        return(null,user);
    });
});

module.exports = passport;