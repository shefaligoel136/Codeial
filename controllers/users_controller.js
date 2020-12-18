// this is a controller which will control many users

const User = require('../models/user')

module.exports.profile = function(request,response){ //exported function profile
    return response.render('user_profile',{
        title: "Profile"
    });
}

// for user sign in
module.exports.signIn = function(request,response){ //exported function profile
    return response.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

// for user sign up
module.exports.signUp = function(request,response){ //exported function profile
    return response.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

//get signup data
module.exports.create = function(request,response){

    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({
        email : request.body.email
    },function(err,user){
        if(err){
            console.log('Error in finding user in signing up!');
            return;
        }

        if(!user){
            User.create(request.body , function(err,user){
                if(err){
                    console.log('Error in creating user while signing up!');
                    return;
                }
                return response.redirect("/users/sign-in");
            })
        }
        else{
            return response.redirect('back');
        }
    });

};


//get signin data and create sessions
module.exports.createSession = function(request,response){
    
    // todo later
};