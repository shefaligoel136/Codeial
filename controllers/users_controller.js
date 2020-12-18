// this is a controller which will control many users

module.exports.profile = function(request,response){ //exported function profile
    return response.render('user_profile',{
        title: "Profile"
    });
}

module.exports.signIn = function(request,response){ //exported function profile
    return response.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

module.exports.signUp = function(request,response){ //exported function profile
    return response.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}