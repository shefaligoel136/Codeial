const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/likes');
const { post } = require('../routes/posts');
const queue = require('../config/kue');
// const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');



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

                comment = await comment.populate('user', 'name email').execPopulate();
                // commentsMailer.newComment(comment);

                // let job = queueMicrotask.create('emails',comment).save(function(err){
                //     if(err){
                //         console.log('Error in creating queue');
                //     }
                //     console.log(job.id);
                // });

                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('Error in creating queue',err);
                    }
                    console.log('job enqueued',job.id);
                });

                if(request.xhr){
                    return response.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "you made a comment!"
                    })
                }

                request.flash('success',"Comment made!")
                response.redirect('/');
            }

            
    
        }
    catch(err) {
        request.flash("error",err);
        return;
    }
}

module.exports.destroy = async function(request,response){
    try{
        let comment = await Comment.findById(request.params.id);

        if(comment.user == request.user.id){

            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId,{
                $pull: {
                    comments: request.params.id
                }
            });

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({
                likeable : comment._id,
                onModel : 'Commet'
            });
            
            if(request.xhr){
                return response.status(200).json({
                    data: {
                        comment_id : request.params.id
                    },
                    message : "Comment deleted"
                });
            }

            request.flash('Success','Comment deleted!');
            return response.redirect('back');
            }else{
                request.flash('error',"You cannot delete this post!");
                return response.redirect('back');
            }
        }
    
    catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }
}

    // Comment.findById(request.params.id, function(err,comment){
        
    //     let postId = comment.post;
        
    //     Post.findById(postId,function(err,post){
    //         if(err){
    //             request.flash("error","Error in finding post");
    //         }
    //         else{
    //             var userId = post.user;
    //             if(userId == request.user.id || comment.user == request.user.id){

    //                 comment.remove();

    //                 Post.findByIdAndUpdate(postId,{
    //                     $pull :  {
    //                         comments: request.params.id
    //                     }
                        
    //                 },function(err,post){

    //                     if(request.xhr){
    //                         console.log("xhr");
    //                         return response.status(200).json({
    //                             data: {
    //                                 comment_id: request.params.id
    //                             },
    //                             message: "comment-deleted!"
    //                         });
    //                     } 
                        
    //                     request.flash('success',"Comment deleted!")
    //                     return response.redirect('back');
    //                 })
    //             } else{
    //                 return response.redirect('back');
    //             }
                
    //         }
    //     })

    // })


