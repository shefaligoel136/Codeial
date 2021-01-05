const Post = require('../models/post');
const User  = require('../models/user');

module.exports.home = function(request,response){ //exported function home
    // console.log(request.cookies);
    // response.cookie('user_id',25);

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        User.find({}, function(err,user){
            return response.render('home',{
                title: "Codeial|Home",
                posts : posts,
                all_users : user
            });
        })   
    })
};
