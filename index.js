const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const User = require('./models/users.js');
const ExpressError = require('./utils/ExpressError.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { log } = require('console');
const userRoutes = require('./routers/user.js');
const recipeRoutes = require('./routers/recipe.js');
const port = 8082;

if (process.env.NODE_ENV === 'production') {
    require('dotenv').config();
}


// require('dotenv').config();
const DB_LINK = process.env.ATLAS_DBLINK;
// const DB_LINK = 'mongodb://127.0.0.1:27017/chefGenie';
main().then((res) => {
    console.log('Mongo Connection Successfull...');
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(DB_LINK);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/public/video')));
app.engine('ejs', ejsMate);

const store = MongoStore.create({
    mongoUrl: DB_LINK,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
    ttl: 20 * 24 * 3600,
});

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.use('/', userRoutes);
app.use('/', recipeRoutes);

app.get('/about', (req, res) => {
    res.render('about.ejs');
});
app.get('/gallery', (req, res) => {
    res.render('gallery.ejs');
});
app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});
app.get('/help', (req, res) => {
    res.render('help.ejs');
});

app.get('/error', (req, res) => {
    res.render('error.ejs');
});

app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});
app.use((err, req, res, next) => {
    let { status, message } = err;
    res.status(status).render('error.ejs', { status, message });
});
app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});
