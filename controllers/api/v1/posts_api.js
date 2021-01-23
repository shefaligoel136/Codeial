const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(request, response){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });


    return response.json(200,{
        message: "Lists of posts",
        posts: posts
    })
}

module.exports.destroy = async function(request,response){
    try{
        let post = await Post.findById(request.params.id)
        // .id means converting the object id into string
        
        // if(post.user == request.user.id){
            post.remove();

          await Comment.deleteMany({
                post:request.params.id     
            });
        
            return response.json(200,{
                message: "Post and associated comments deleted successfully!"
            });
        // }else{
        //     request.flash('error',"You cannot delete this post!");
        //     return response.redirect('back');
        // }

    }
    catch(err){
        return response.json(500,{
            message: "Internal server error"
        });
    }
   
}