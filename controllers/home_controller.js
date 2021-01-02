const Post = require('../models/post');

module.exports.home = function(request,response){ //exported function home
    // console.log(request.cookies);
    // response.cookie('user_id',25);

    Post.find({}).populate('user').exec(function(err,posts){
        return response.render('home',{
            title: "Codeial|Home",
            posts : posts
        });
    })
};
