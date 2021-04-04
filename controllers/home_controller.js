const Post = require('../models/post');
const User  = require('../models/user');


module.exports.home = async function(request,response){ //exported function home
    // console.log(request.cookies);
    // response.cookie('user_id',25);

    try{
        // CHANGE :: Populate the like for each post and comment
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes' 
        } // this populate id for comments
    }).populate('likes'); // this populate id for posts

    let users = await User.find({});

    return response.render('home',{
        title: "Codeial|Home",
        posts : posts,
        all_users : users

    });
    }catch(err){
        console.log('Error',err);
        return;
    }
}

