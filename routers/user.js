const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController.js');

router.get('/signup', userController.showSignupForm);
router.post('/signup', userController.addNewUserSignUp);

router.get('/login', userController.showLoginForm);
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true })
    , userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;