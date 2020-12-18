const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log("Connected to database :: MongoDB")
});

module.exports = db;