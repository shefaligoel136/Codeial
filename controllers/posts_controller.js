const Post = require('../models/post');

module.exports.create = function(request,response){
    Post.create({

        content : request.body.content,
        user : request.user._id

    },function(err,post){
        if(err){
            console.log('Error in creating a post');
            return;
        }
        return response.redirect('back');
    });
}