const User = require('../models/users.js');
module.exports.showSignupForm = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.addNewUserSignUp = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let findUser = await User.findOne({ $or: [{ username }, { email }] });
        console.log(findUser);
        if (findUser === null) {
            let userSignin = new User({ email, username });
            let registeredUser = await User.register(userSignin, password);
            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash('success', 'Welcome to the Chef Genie');
                res.redirect('/recipe');
            });
        }
        else if (findUser.email === email && findUser.username === username) {
            req.flash('error', 'Email and Username is already Registered..!');
            res.redirect('/signup');
        } else if (findUser.username === username) {
            req.flash('error', 'Username is already Registered..!');
            res.redirect('/signup');
        } else if (findUser.email === email) {
            req.flash('error', 'Email is already Registered..!');
            res.redirect('/signup');
        }
    }
    catch (err) {
        req.flash('error', 'Please enter valid details...!');
        res.redirect('/signup');
    }
};

module.exports.showLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome to the Chef Genie');
    res.redirect('/recipe');
};
module.exports.logoutUser = (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'You successfully logged out from Chef Genie');
            res.redirect('/');
        });
    } catch (err) {
        req.flash('error', 'Some Error in Logout...!');
    }
};