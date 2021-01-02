const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(request,response){
    Post.findById(request.body.post , function(err,post){

        if(post){
            Comment.create({
                content : request.body.content,
                user : request.user._id,
                post : request.body.post
            }, function(err,comment){
                post.comments.push(comment);
                post.save(); // save tells db that is it the final version so save it

                response.redirect('/');
            });
        }

    });
}