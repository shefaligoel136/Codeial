const nodemailer = require("nodemailer");

// define transporter - tells how the communication is going to take place
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    secure : false,
    auth : {
        user : 'alchemy.cn18',
        pass : 'codingninjas'
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
                console.log("Error in rendering template");
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