const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async function(request,response){

    try{
        let post = await Post.findById(request.body.post)

            if(post){
               let comment = await Comment.create({
                    content : request.body.content,
                    user : request.user._id,
                    post : request.body.post
                });
                    
                post.comments.push(comment);
                post.save(); // save tells db that is it the final version so save it
    
                response.redirect('/');
            }
    
        }
    catch(err) {
        console.log("error",err);
        return;
    }
}

module.exports.destroy = function(request,response){
    Comment.findById(request.params.id, function(err,comment){
        
        let postId = comment.post;
        
        Post.findById(postId,function(err,post){
            if(err){
                console.log("Error in finding post");
            }
            else{
                var userId = post.user;
                if(userId == request.user.id || comment.user == request.user.id){
                    comment.remove();

                    Post.findByIdAndUpdate(postId,{
                        $pull :  {
                            comments: request.params.id
                        }
                    },function(err,post){
                        return response.redirect('back');
                    })
                } else{
                    return response.redirect('back');
                }
                
            }
        })

    })
}

