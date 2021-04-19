const development = {
    name:'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db : 'codeial_development',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port: 587,
        secure : false,
        auth : {
            user : 'shefali136goel@gmail.com',
            pass : 'shefali136'
        }
    },
    google_client_id: "409261034159-mj8q59t25nfgnj95h7iipftn20u1tcm8.apps.googleusercontent.com",
    google_client_secret: "mVQeQhJ9SRj0SqsdoTrg8erk",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

const production = {
    name:'production'
}

module.exports = development;