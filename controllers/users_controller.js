// this is a controller which will control many users

module.exports.profile = function(request,response){ //exported function profile
    return response.render('user_profile',{
        title: "Profile"
    });
}