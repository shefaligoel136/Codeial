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
        return done(null,user);
    });
});


// check if the user is authenticated - middleware

passport.checkAuthentication = function(request,response,next){

    // if user is signed in, then pass on the request to next function -> controller's action

    if(request.isAuthenticated()){
        return next();
    }

    // if user is note signed in
    return response.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(request,response,next){
    if(request.isAuthenticated()){

        // request.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views

        response.locals.user = request.user;
    }
}

module.exports = passport;