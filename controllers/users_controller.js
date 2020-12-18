// this is a controller which will control many users

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