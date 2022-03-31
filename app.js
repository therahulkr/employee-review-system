const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const passLocal = require('./config/passport_local');
// const { initialisePassport } = require('./config/passport_local');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');

// This method is used to parse the incoming requests with JSON 
// payloads and is based upon the bodyparser.
app.use(express.json());
// function is a built-in middleware function in Express. 
// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(cookieParser());

//mongodb to store the session cookie for user login
app.use(expressSession({
    name : 'xyz',
    secret : process.env.SESSION_COOKIE_KEY,
    saveUninitialized : false,
    resave: false,
    cookie:{
        maxAge : 6000000
    },
    store : MongoStore.create(
        { 
            mongoUrl: process.env.DB_URI,
            autoRemove:'disabled' 
        },
        (err)=>{
            console.log(err || 'connect mongo setup ok')
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//routes import
// const proudct = require('./routes/productRoute');

// app.use('/api/v1',proudct);


// setting up the view engine and path for static files
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(process.env.ASSETPATH))


app.use('/', require('./routes'));
module.exports = app;