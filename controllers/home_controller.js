const Post = require('../models/post');
const User  = require('../models/user');

module.exports.home = async function(request,response){ //exported function home
    // console.log(request.cookies);
    // response.cookie('user_id',25);

    try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

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

