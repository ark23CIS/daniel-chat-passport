'use strict';

var init = function() {

    if (process.env.NODE_ENV === 'production') {
        return {
            db: {
                username: process.env.dbUsername,
                password: process.env.dbPassword,
                host: process.env.dbHost,
                port: process.env.dbPort,
                name: process.env.dbName
            },
            sessionSecret: process.env.sessionSecret,
            facebook: {
                clientID: process.env.facebookClientID,
                clientSecret: process.env.facebookClientSecret,
                callbackURL: "/auth/facebook/callback",
                profileFields: ['id', 'displayName', 'photos']
            }
        }
    } else {
        return require('./config.json');
    }
}

module.exports = init();