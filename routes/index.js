const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/users/login', forwardAuthenticated, (req, res) => {
    res.render('login');
    console.log(forwardAuthenticated);
});


router.get('/chat', ensureAuthenticated, (req, res) =>
    res.render('chat', {
        user: req.user
    })
);


router.get('/auth/vkontakte', passport.authenticate('vkontakte', {
    scope: ['profile']
}));
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
}));
router.get('/auth/github', passport.authenticate('github', {
    scope: ['profile']
}));
router.get('/auth/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/chat/');
});
router.get('/auth/vkontakte/redirect', passport.authenticate('vkontakte'), (req, res) => {
    res.redirect('/chat/');
});
router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/chat/');
});
router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;