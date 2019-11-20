module.exports = {
    mongoURI: 'mongodb+srv://Johnston:test_password@cluster0-g6dxk.mongodb.net/test?retryWrites=true&w=majority',
    facebook: {
        clientID: "334644880819152",
        clientSecret: "66a7c433ee2a4ae94e95226b3534d024",
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos"]
    },
    vkontakte: {
        clientID: "7039596",
        clientSecret: "JBtQ7wkVqXlCC36dID4t",
        callbackURL: "/auth/vkontakte/redirect",
        profileFields: ["id", "displayName", "photos"]
    },
    github: {
        clientID: "3c7266f775289d52def4",
        callbackURL: "/auth/github/redirect",
        clientSecret: "a050c34a813ea39ea973ca911af0696416e5940b"
    }
}