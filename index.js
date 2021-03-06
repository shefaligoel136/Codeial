const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();

// helper function
require('./config/view-helpers')(app);

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');


// setup chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");
const path = require('path');


if(env.name == 'development'){
    app.use(sassMiddleware({
        // src: './assets/scss',
        // dest: './assets/css',
    
        src : path.join(__dirname,env.asset_path,'scss'),
        dest : path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'extented',
        prefix:'/css'
    }));
}


app.use(express.urlencoded({extended: false }));

app.use(cookieParser());

// app.use(express.static('./assets'));
app.use(express.static(env.asset_path));


// make the uplaods path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts)


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// set up view engine
app.set('view engine','ejs');
app.set('views',"./views");

// mongo db is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    // TODO change secret before deployment in production mode
    // secret: "blahsomething",
    secret : 'env.session_cookie_key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());   
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});