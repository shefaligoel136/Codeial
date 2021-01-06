const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(request,response){

    try{
        let post =  await Post.create({

            content : request.body.content,
            user : request.user._id
    
        });
        
       return response.redirect('back');
    
    }
    
    catch(err){
        console.log("Error",err);
    }
    
    
}

module.exports.destroy = function(request,response){
    Post.findById(request.params.id, function(err,post){
        // .id means converting the object id into string
        if(post.user == request.user.id){
            post.remove();

            Comment.deleteMany({
                post:request.params.id
            },function(err){
                return response.redirect('back');
            });
        }else{
            return response.redirect('back');
        }
    })
}