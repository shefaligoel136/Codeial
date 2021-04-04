const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/likes');


// create our action

module.exports.toggleLike = async function(request,response){
    try{

        // eg URL- likes/toggle/?id=abcd&type=Post

        let likeable;
        let deleted = false; // based on json data you can increment or decrement the like data 

        if(request.query.type == 'Post'){
            likeable = await Post.findById(request.query.id).populate('likes'); // if the post contains other likes, I'll need to know hence using populate
        }else{
            likeable = await Comment.findById(request.query.id).populate('likes');
        }

        // check if like already exists

        let existingLike = await Like.findOne({
            likeable : request.query.id,
            onModel : request.query.type,
            user : request.user._id
        });

        // if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true
        }else{
            // make a new like
            let newLike = await Like.create({
                user : request.user._id,
                likeable : request.query.id,
                onModel : request.query.type
            });

            likeable.likes.push(newLike._id); 
            likeable.save();
        }

        return response.json(200,{
            message : "Request successfull!",
            data : {
                deleted : deleted
            }
        });


    }catch(err){
        console.log(err);
        return response.json(500,{
            message : 'Internal server error'
        });
    }
}