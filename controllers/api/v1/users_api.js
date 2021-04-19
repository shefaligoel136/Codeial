
const User = require('../../../models/user');
const env = require('../../../config/environment');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(request,response){
try{

    let user = await User.findOne({
        email: request.body.email
    });

    if(!user || user.password != request.body.password){
        return response.json(422,{
            message: "Invalid username and password"
        });
    }

    return response.json(200,{
        message: "Sign in successful, here is your token! Keep it safe",
        data: {
            token: jwt.sign(user.toJSON(),env.jwt_secret,{
                expiresIn: '100000'
            })
        }
    })
}catch(err){
    console.log("*****",err);
    return response.json(500,{
        message: "Internal server error"
    });
}
};