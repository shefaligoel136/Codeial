const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // The user who sends the reuest
    form_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // The user who accepts the request, the naming is just to understand, otherwise the users won't see any difference
    to_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }   
},{
    timestamps : true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;