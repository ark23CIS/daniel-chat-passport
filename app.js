const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport');
const flash = require('connect-flash');
const session = require('express-session');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
connections = [];
io.sockets.on('connection', function(socket) {
    console.log("Успешное соединение");
    connections.push(socket);
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    });
    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
    });

});