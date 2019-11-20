const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('./keys');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);
        })
    });
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        }))
    passport.use(new GitHubStrategy(keys.github, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({
            githubID: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {

            }
        })
        new User({
            name: profile.displayName,
            githubID: profile.id,
            email: profile.email
        }).save().then((newUser) => {
            console.log('new user created' + newUser);
            done(null, newUser);
        })
    }));
    passport.use(new VKontakteStrategy(keys.vkontakte, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({
            vkontakteID: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {

            }
        })
        new User({
            name: profile.displayName,
            vkontakteID: profile.id,
            email: profile.email
        }).save().then((newUser) => {
            console.log('new user created' + newUser);
            done(null, newUser);
        })
    }));
    passport.use(new FacebookStrategy(keys.facebook, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({
            facebookID: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {

            }
        })
        new User({
            name: profile.displayName,
            facebookID: profile.id,
        }).save().then((newUser) => {
            console.log('new user created' + newUser);
            done(null, newUser);
        })
    }));
};