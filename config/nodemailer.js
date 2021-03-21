const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

// define transporter - tells how the communication is going to take place
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    secure : false,
    auth : {
        user : 'shefali136goel@gmail.com',
        pass : 'shefali136'
    }
});

// defines for html files to be rendered which are defined under the mailers folder inside views
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering template",err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

// export and use  it
module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}