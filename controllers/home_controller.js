module.exports.home = function(request,response){ //exported function home
    return response.render('home',{
        title: "Home"
    });
};