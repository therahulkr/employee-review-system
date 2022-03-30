const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const passLocal = require('./config/passport_local');
// const { initialisePassport } = require('./config/passport_local');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');



// initialisePassport(passport);
app.use(express.json());
app.use(express.urlencoded());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(cookieParser());

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
            mongoUrl: `mongodb://localhost/${process.env.DB_URI}`,
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



app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(process.env.ASSETPATH))

app.use('/', require('./routes'));
module.exports = app;