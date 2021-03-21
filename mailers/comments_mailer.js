const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside newComment mailer');
    let htmlString = nodemailer.renderTemplate({
        comment : comment
    },'/comments/new_comments.ejs');

    nodemailer.transporter.sendMail({
        from: 'goel136shefali@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in sending the mail", err);
            return;
        }
        console.log('Mail delivered',info);
        return;
    });
}